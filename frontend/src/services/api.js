import axios from 'axios';
import logger from '../utils/logger';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        logger.error('API request error', error);
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        logger.error('API response error', error.response || error);
        if (error.response?.status === 401) {
            const requestUrl = error.config?.url || '';
            const hasToken = Boolean(localStorage.getItem('token'));
            const isAuthLogin = requestUrl.includes('/auth/login');
            const isAuthRegister = requestUrl.includes('/auth/register');
            const isOnLoginPage = window.location.pathname === '/login';

            // Only force redirect when we had an authenticated session
            // and we're not already on the login page, and it's not the login/register call itself.
            if (hasToken && !isOnLoginPage && !isAuthLogin && !isAuthRegister) {
                localStorage.removeItem('token');
                window.location.href = '/login';
                return; // stop further promise handling
            }
            // For login/register attempts or when no token is present, let the caller handle the error
        }
        return Promise.reject(error);
    }
);

export default api;