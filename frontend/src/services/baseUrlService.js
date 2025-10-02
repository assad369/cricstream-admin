import api from './api';

const baseUrlService = {
    getBaseUrls: (params = {}) => api.get('/base-urls', { params }),
    getBaseUrl: (id) => api.get(`/base-urls/${id}`),
    createBaseUrl: (data) => api.post('/base-urls', data),
    updateBaseUrl: (id, data) => api.put(`/base-urls/${id}`, data),
    deleteBaseUrl: (id) => api.delete(`/base-urls/${id}`),
    toggleActiveStatus: (id) => api.put(`/base-urls/${id}/toggle-active`)
};

export default baseUrlService;