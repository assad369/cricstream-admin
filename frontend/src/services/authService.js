import api from './api';

const authService = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (email, password, role) => api.post('/auth/register', { email, password, role }),
    getCurrentUser: () => api.get('/auth/me'),
    updatePassword: (currentPassword, newPassword) =>
        api.put('/auth/updatepassword', { currentPassword, newPassword }),
    updateProfile: (name, email) => api.put('/auth/profile', { name, email })
};

export default authService;