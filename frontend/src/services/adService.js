import api from './api';

const adService = {
    getAds: (params = {}) => api.get('/ads', { params }),
    getAd: (id) => api.get(`/ads/${id}`),
    createAd: (data) => api.post('/ads', data),
    updateAd: (id, data) => api.put(`/ads/${id}`, data),
    deleteAd: (id) => api.delete(`/ads/${id}`),
    toggleActiveStatus: (id) => api.put(`/ads/${id}/toggle-active`)
};

export default adService;