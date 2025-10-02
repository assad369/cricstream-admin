import api from './api';

const statsService = {
    getDashboardStats: () => api.get('/stats/dashboard'),
    getUserStats: (params = {}) => api.get('/stats/users', { params }),
    getContentStats: () => api.get('/stats/content'),
    getAdStats: () => api.get('/stats/ads')
};

export default statsService;