import api from './api';

const highlightService = {
    getHighlights: (params = {}) => api.get('/highlights', { params }),
    getHighlight: (id) => api.get(`/highlights/${id}`),
    createHighlight: (data) => api.post('/highlights', data),
    updateHighlight: (id, data) => api.put(`/highlights/${id}`, data),
    deleteHighlight: (id) => api.delete(`/highlights/${id}`)
};

export default highlightService;