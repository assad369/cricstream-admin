import React, { createContext, useContext, useState, useEffect } from 'react';
import logger from '../utils/logger';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Get current user
            authService.getCurrentUser()
                .then(response => {
                    // Backend wraps data as { success, message, data: { user } }
                    const currentUser = response?.data?.data?.user;
                    setUser(currentUser || null);
                })
                .catch(error => {
                    logger.error('Failed to get current user', error);
                    localStorage.removeItem('token');
                    setUser(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            // Backend wraps data as { success, message, data: { user, token } }
            const payload = response?.data?.data;
            const token = payload?.token;
            const user = payload?.user;

            if (token) {
                localStorage.setItem('token', token);
            }
            setUser(user || null);

            return { success: true };
        } catch (error) {
            logger.error('Login failed', error.response || error);
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    const updatePassword = async (currentPassword, newPassword) => {
        try {
            await authService.updatePassword(currentPassword, newPassword);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Password update failed'
            };
        }
    };

    const value = {
        user,
        login,
        logout,
        updatePassword,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};