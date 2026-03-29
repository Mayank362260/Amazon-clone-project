import axios from 'axios';

const api = axios.create({
    // Live Render Backend URL
    baseURL: 'https://amazon-clone-project-721k.onrender.com/api',
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('amazon_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
