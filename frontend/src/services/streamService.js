import api from './api';

const streamService = {
    getStreams: (params = {}) => api.get('/streams', { params }),
    getStream: (id) => api.get(`/streams/${id}`),
    createStream: (data) => api.post('/streams', data),
    updateStream: (id, data) => api.put(`/streams/${id}`, data),
    deleteStream: (id) => api.delete(`/streams/${id}`),
    toggleLiveStatus: (id) => api.put(`/streams/${id}/toggle-live`)
};

export default streamService;