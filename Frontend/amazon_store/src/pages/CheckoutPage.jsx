import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Navbar from '../components/Navbar';

const CheckoutPage = () => {
    const [cart, setCart] = useState({ items: [] });
    const [address, setAddress] = useState({
        fullName: '',
        phone: '',
        pincode: '',
        addressLine: '',
        city: '',
        state: ''
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await api.get('/cart');
                setCart(response.data);
            } catch (err) {
                console.error("Cart fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const placeOrder = async () => {
        if (!address.fullName || !address.addressLine || !address.city) {
            alert("Please fill in the required address fields.");
            return;
        }

        setSubmitting(true);
        try {
            const subtotal = cart.items.reduce((acc, item) => acc + (item.Product?.price * item.quantity), 0);
            const response = await api.post('/orders', {
                items: cart.items,
                total: subtotal,
                address: address
            });
            
            // Redirect to success page with order ID
            navigate('/order-success', { state: { orderId: response.data.id } });
        } catch (err) {
            console.error("Order placement error:", err);
            alert("Checkout failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const subtotal = cart.items.reduce((acc, item) => acc + ((item.Product?.price || 0) * item.quantity), 0);
    const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading Checkout...</div>;

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '50px' }}>
            <div style={{ padding: '15px 50px', backgroundColor: '#F8F8F8', borderBottom: '1px solid #DDD', textAlign: 'center' }}>
                <img 
                    src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
                    alt="Logo" 
                    style={{ height: '30px', cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                />
                <h1 style={{ fontSize: '24px', fontWeight: '400' }}>Checkout ({totalItems} items)</h1>
            </div>

            <div style={{ maxWidth: '1100px', margin: '30px auto', display: 'flex', gap: '30px', padding: '0 20px' }}>
                <div style={{ flex: 1 }}>
                    {/* Shipping Address Section */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #DDD' }}>
                        <h2 style={{ fontSize: '20px', color: '#B12704', marginBottom: '15px' }}>1. Shipping Address</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <input type="text" name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleChange} style={inputStyle} />
                            <input type="text" name="phone" placeholder="Phone Number" value={address.phone} onChange={handleChange} style={inputStyle} />
                            <input type="text" name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} style={inputStyle} />
                            <input type="text" name="city" placeholder="City" value={address.city} onChange={handleChange} style={inputStyle} />
                            <input type="text" name="addressLine" placeholder="Address (House No, Street, Area)" value={address.addressLine} onChange={handleChange} style={{ ...inputStyle, gridColumn: '1 / -1' }} />
                        </div>
                    </div>

                    {/* Order Summary Review */}
                    <div style={{ marginTop: '20px' }}>
                        <h2 style={{ fontSize: '20px', color: '#B12704', marginBottom: '15px' }}>2. Review Items</h2>
                        <div style={{ backgroundColor: '#F9F9F9', padding: '15px', borderRadius: '4px' }}>
                            {cart.items.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '15px', marginBottom: '10px', borderBottom: '1px solid #EEE', paddingBottom: '10px' }}>
                                    <img src={item.Product?.image?.[0]} alt={item.Product?.name} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                                    <div style={{ flex: '1' }}>
                                        <p style={{ fontSize: '14px', fontWeight: '500' }}>{item.Product?.name}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                                            <span style={{ fontSize: '12px' }}>Qty: {item.quantity}</span>
                                            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>₹{(item.Product?.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ width: '300px' }}>
                    <div style={{ border: '1px solid #DDD', padding: '15px', borderRadius: '8px' }}>
                        <button 
                            className="amazon-button-gold" 
                            disabled={submitting}
                            onClick={placeOrder}
                            style={{ width: '100%', marginBottom: '15px', padding: '10px 0' }}
                        >
                            {submitting ? 'Placing Order...' : 'Use this address'}
                        </button>
                        <p style={{ fontSize: '12px', textAlign: 'center', color: '#565959', marginBottom: '15px' }}>
                            By placing your order, you agree to Amazon's conditions of use.
                        </p>
                        <hr style={{ border: 'none', borderTop: '1px solid #EEE' }}/>
                        <h3 style={{ fontSize: '18px', marginTop: '15px' }}>Order Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '10px' }}>
                            <span>Items:</span>
                            <span>₹{subtotal.toLocaleString()}.00</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '5px', color: '#007600' }}>
                            <span>Delivery:</span>
                            <span>FREE</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '700', marginTop: '20px', color: '#B12704', borderTop: '1px solid #EEE', paddingTop: '10px' }}>
                            <span>Order Total:</span>
                            <span>₹{subtotal.toLocaleString()}.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    padding: '8px 10px',
    border: '1px solid #888',
    borderRadius: '3px',
    outline: 'none',
    fontSize: '14px'
};

export default CheckoutPage;
