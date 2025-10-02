import api from './api';

const socialLinkService = {
    getSocialLinks: (params = {}) => api.get('/social-links', { params }),
    getSocialLink: (id) => api.get(`/social-links/${id}`),
    createSocialLink: (data) => api.post('/social-links', data),
    updateSocialLink: (id, data) => api.put(`/social-links/${id}`, data),
    deleteSocialLink: (id) => api.delete(`/social-links/${id}`),
    toggleActiveStatus: (id) => api.put(`/social-links/${id}/toggle-active`)
};

export default socialLinkService;