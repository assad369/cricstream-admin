import api from './api';

const announcementService = {
    getAnnouncements: (params = {}) => api.get('/announcements', { params }),
    getAnnouncement: (id) => api.get(`/announcements/${id}`),
    createAnnouncement: (data) => api.post('/announcements', data),
    updateAnnouncement: (id, data) => api.put(`/announcements/${id}`, data),
    deleteAnnouncement: (id) => api.delete(`/announcements/${id}`),
    toggleActiveStatus: (id) => api.put(`/announcements/${id}/toggle-active`)
};

export default announcementService;

