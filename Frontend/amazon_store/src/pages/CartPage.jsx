import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const response = await api.get('/cart');
            setCart(response.data);
        } catch (err) {
            console.error("Cart fetch error:", err);
            setCart({ items: [] });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQuantity = async (productId, currentQty, delta) => {
        const newQty = currentQty + delta;
        if (newQty < 1) {
            removeFromCart(productId);
            return;
        }
        try {
            const response = await api.post('/cart', { productId, quantity: newQty });
            setCart(response.data);
        } catch (err) {
            console.error("Update qty error:", err);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await api.delete(`/cart/${productId}`);
            setCart(response.data);
        } catch (err) {
            console.error("Remove from cart error:", err);
        }
    };

    const subtotal = (cart?.items || []).reduce((acc, item) => {
        const price = item.Product?.price || 0;
        return acc + (price * item.quantity);
    }, 0);

    const totalItems = (cart?.items || []).reduce((acc, item) => acc + item.quantity, 0);

    if (loading) {
        return (
            <div style={{ backgroundColor: '#EAEDED', minHeight: '100vh' }}>
                <Navbar cartCount={0} />
                <div style={{ textAlign: 'center', padding: '100px' }}>Loading Cart...</div>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: '#EAEDED', minHeight: '100vh' }}>
            <Navbar cartCount={totalItems} />
            
            <main style={{ maxWidth: '1500px', margin: '20px auto', padding: '0 20px', display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1, backgroundColor: 'white', padding: '20px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '500', paddingBottom: '10px', borderBottom: '1px solid #DDD' }}>
                        Shopping Cart
                    </h1>
                    
                    {!cart?.items || cart.items.length === 0 ? (
                        <div style={{ padding: '40px 0', textAlign: 'center' }}>
                            <p>Your Amazon Cart is empty.</p>
                            <button 
                                onClick={() => navigate('/')}
                                style={{ marginTop: '20px', backgroundColor: '#ffd814', border: '1px solid #fcd200', padding: '8px 20px', borderRadius: '8px' }}
                            >
                                Shop products
                            </button>
                        </div>
                    ) : (
                        cart.items.filter(item => item.Product).map((item) => (
                            <div key={item.id} style={{ display: 'flex', padding: '20px 0', borderBottom: '1px solid #EEE', gap: '20px' }}>
                                <div style={{ flex: '0 0 180px' }}>
                                    <img src={item.Product?.image?.[0]} alt={item.Product?.name} style={{ width: '100%', objectFit: 'contain', maxHeight: '180px' }} />
                                </div>
                                <div style={{ flex: '1' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '5px' }}>{item.Product?.name}</h3>
                                    <p style={{ color: '#007600', fontSize: '12px', marginBottom: '10px' }}>In Stock</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F0F2F2', border: '1px solid #D5D9D9', borderRadius: '8px', padding: '0 10px', boxShadow: '0 2px 5px rgba(213,217,217,0.5)' }}>
                                            <button 
                                                style={{ border: 'none', background: 'none', padding: '5px 10px', cursor: 'pointer', fontSize: '18px' }}
                                                onClick={() => updateQuantity(item.ProductId, item.quantity, -1)}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span style={{ padding: '0 10px', fontSize: '14px', borderLeft: '1px solid #D5D9D9', borderRight: '1px solid #D5D9D9' }}>{item.quantity}</span>
                                            <button 
                                                style={{ border: 'none', background: 'none', padding: '5px 10px', cursor: 'pointer', fontSize: '18px' }}
                                                onClick={() => updateQuantity(item.ProductId, item.quantity, 1)}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <span 
                                            style={{ color: '#007185', fontSize: '12px', cursor: 'pointer', borderLeft: '1px solid #DDD', paddingLeft: '15px' }}
                                            onClick={() => removeFromCart(item.ProductId)}
                                        >
                                            Delete
                                        </span>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <strong style={{ fontSize: '18px' }}>
                                        ₹{(item.Product?.price || 0).toLocaleString()}
                                    </strong>
                                </div>
                            </div>
                        ))
                    )}
                    
                    <div style={{ textAlign: 'right', marginTop: '10px' }}>
                        <p style={{ fontSize: '18px' }}>
                            Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''}): <b>₹{subtotal.toLocaleString()}.00</b>
                        </p>
                    </div>
                </div>

                <div style={{ width: '300px', backgroundColor: 'white', padding: '20px', height: 'fit-content' }}>
                    <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                        Subtotal ({totalItems} items): <b>₹{subtotal.toLocaleString()}.00</b>
                    </p>
                    <button 
                        onClick={() => navigate('/checkout')}
                        className="amazon-button-gold" 
                        style={{ width: '100%', borderRadius: '8px', fontWeight: '500', padding: '10px 0' }}
                    >
                        Proceed to Buy
                    </button>
                </div>
            </main>
        </div>
    );
};

export default CartPage;
