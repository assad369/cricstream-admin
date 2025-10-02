import api from './api';

const liveTvService = {
    getLiveTvChannels: (params = {}) => api.get('/live-tv', { params }),
    getLiveTvChannel: (id) => api.get(`/live-tv/${id}`),
    createLiveTvChannel: (data) => api.post('/live-tv', data),
    updateLiveTvChannel: (id, data) => api.put(`/live-tv/${id}`, data),
    deleteLiveTvChannel: (id) => api.delete(`/live-tv/${id}`),
    toggleLiveStatus: (id) => api.put(`/live-tv/${id}/toggle-live`)
};

export default liveTvService;