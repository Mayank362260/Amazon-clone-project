import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const response = await api.post(endpoint, formData);
            
            localStorage.setItem('amazon_token', response.data.token);
            localStorage.setItem('amazon_user', JSON.stringify(response.data.user));
            
            navigate('/');
            window.location.reload();
        } catch (err) {
            alert(err.response?.data?.error || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
                alt="Amazon" 
                style={{ width: '100px', cursor: 'pointer', marginBottom: '30px' }}
                onClick={() => navigate('/')}
            />

            <div style={{ width: '350px', border: '1px solid #DDD', borderRadius: '4px', padding: '25px', display: 'flex', flexDirection: 'column' }}>
                <h1 style={{ fontWeight: '500', marginBottom: '20px', fontSize: '28px' }}>
                    {isLogin ? 'Sign-In' : 'Create Account'}
                </h1>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {!isLogin && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Your name</label>
                            <input 
                                type="text"
                                style={inputStyle}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    )}
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 'bold' }}>E-mail</label>
                        <input 
                            type="email" 
                            style={inputStyle}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Password</label>
                        <input 
                            type="password" 
                            style={inputStyle}
                            placeholder="At least 6 characters"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="amazon-button-gold"
                        style={{ width: '100%', padding: '8px 0', marginTop: '10px' }}
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Sign-In' : 'Create Account')}
                    </button>
                </form>

                <p style={{ fontSize: '12px', marginTop: '20px', lineHeight: '1.5' }}>
                    By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
                </p>
                
                {isLogin && <p style={{ fontSize: '12px', color: '#0066c0', marginTop: '15px', cursor: 'pointer' }}>Need help?</p>}
            </div>

            <div style={{ width: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '15px' }}>
                    <div style={{ flex: 1, height: '1px', background: '#EEE' }}></div>
                    <span style={{ padding: '0 10px', fontSize: '12px', color: '#767676' }}>{isLogin ? 'New to Amazon?' : 'Already have an account?'}</span>
                    <div style={{ flex: 1, height: '1px', background: '#EEE' }}></div>
                </div>

                <button 
                    onClick={() => setIsLogin(!isLogin)}
                    style={{ width: '100%', background: '#fcfcfc', border: '1px solid #ADB1B8', borderRadius: '3px', padding: '6px 0', fontSize: '13px', cursor: 'pointer' }}
                >
                    {isLogin ? 'Create your Amazon account' : 'Sign-In now'}
                </button>
            </div>
        </div>
    );
};

const inputStyle = {
    padding: '8px',
    border: '1px solid #a6a6a6',
    borderRadius: '3px',
    fontSize: '13px',
    outline: 'none'
};

export default AuthPage;
