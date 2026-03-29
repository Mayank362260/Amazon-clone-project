import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { ShoppingCart, Zap, Star, ShieldCheck, Truck } from 'lucide-react';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [activeImg, setActiveImg] = useState(0);

    useEffect(() => {
        api.get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    const addToCart = async () => {
        try {
            await api.post('/cart', { productId: product.id, quantity: 1 });
            alert("Added to cart!");
        } catch (err) { alert("Cart failed to update"); }
    };

    if (loading) return <div className="p-20 text-center font-bold">Loading product details...</div>;
    if (!product) return <div className="p-20 text-center">Sorry, product not found.</div>;

    const images = product.image || ['https://via.placeholder.com/600x400?text=No+Image'];

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
            <Navbar />
            <div className="product-detail-container" style={{ maxWidth: '1400px', margin: '20px auto', padding: '0 20px', display: 'flex', gap: '30px' }}>
                
                {/* Image Gallery */}
                <div style={{ flex: '1.2', display: 'flex', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {images.map((img, idx) => (
                            <img 
                                key={idx}
                                src={img} 
                                alt="thumb"
                                onMouseEnter={() => setActiveImg(idx)}
                                style={{ width: '40px', height: '40px', objectFit: 'contain', border: activeImg === idx ? '2px solid #E77600' : '1px solid #DDD', borderRadius: '4px', cursor: 'pointer', padding: '2px' }}
                            />
                        ))}
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', backgroundColor: '#F8F8F8', padding: '20px', borderRadius: '8px', height: '500px' }}>
                        <img 
                            src={images[activeImg]} 
                            alt={product.name} 
                            referrerPolicy="no-referrer" 
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                        />
                    </div>
                </div>

                {/* Content */}
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '8px' }}>{product.name}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#007185', fontSize: '14px', marginBottom: '15px' }}>
                        <span style={{ color: '#FFA41C', display: 'flex' }}>
                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? '#FFA41C' : 'none'} />)}
                        </span>
                        <span style={{ marginLeft: '10px' }}>{product.reviewsCount} ratings</span>
                    </div>
                    <div style={{ borderTop: '1px solid #EEE', borderBottom: '1px solid #EEE', padding: '15px 0', marginBottom: '15px' }}>
                        <div style={{ color: '#B12704' }}>
                            <span style={{ fontSize: '13px' }}>₹</span>
                            <span style={{ fontSize: '28px', fontWeight: '500' }}>{product.price.toLocaleString()}</span>
                        </div>
                        <p style={{ fontSize: '14px', color: '#565959', marginTop: '10px' }}>{product.description}</p>
                    </div>
                    
                    <div style={{ fontSize: '14px', color: '#333' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <Truck size={18} color="#007185" /> <strong>Fast Delivery:</strong> Tomorrow by 10 PM
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <ShieldCheck size={18} color="#007185" /> <strong>Warranty:</strong> 1 Year Brand Warranty
                        </div>
                    </div>
                </div>

                {/* Buy Box */}
                <div style={{ border: '1px solid #DDD', borderRadius: '8px', padding: '20px' }}>
                    <div style={{ fontSize: '24px', color: '#B12704', marginBottom: '15px' }}>₹{product.price.toLocaleString()}</div>
                    <p style={{ color: '#007600', fontWeight: 'bold', fontSize: '18px', marginBottom: '15px' }}>In Stock</p>
                    <button 
                        onClick={addToCart}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#FFD814', border: '1px solid #FCD200', borderRadius: '20px', marginBottom: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <ShoppingCart size={18} /> Add to Cart
                    </button>
                    <button 
                        onClick={() => navigate('/checkout')}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#FFA41C', border: '1px solid #FF8F00', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <Zap size={18} /> Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
