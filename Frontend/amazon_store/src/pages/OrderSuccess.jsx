import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import Navbar from '../components/Navbar';

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderId = location.state?.orderId || "AMZ-" + Math.floor(Math.random() * 1000000);

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '50px' }}>
            <Navbar cartCount={0} />
            <Confetti numberOfPieces={200} recycle={false} />
            
            <div style={{ maxWidth: '800px', margin: '50px auto', padding: '40px', border: '1px solid #DDD', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ color: '#007600', marginBottom: '20px' }}>
                    <svg style={{ width: '80px', height: '80px' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </div>
                
                <h1 style={{ fontSize: '30px', color: '#B12704', marginBottom: '10px' }}>Thank you for your order!</h1>
                <p style={{ fontSize: '18px', color: '#565959', marginBottom: '30px' }}>
                    We've received your request. An order confirmation has been sent to your email.
                </p>
                
                <div style={{ backgroundColor: '#F9F9F9', padding: '20px', borderRadius: '4px', marginBottom: '30px', border: '1px solid #EEE' }}>
                    <p style={{ fontWeight: '600', fontSize: '18px', marginBottom: '5px' }}>Order Confirmation Number:</p>
                    <p style={{ fontSize: '24px', color: '#007185', fontWeight: 'bold' }}>{orderId}</p>
                </div>
                
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <button 
                        onClick={() => navigate('/')}
                        className="amazon-button-gold"
                        style={{ padding: '10px 40px', borderRadius: '8px' }}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
