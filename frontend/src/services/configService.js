import api from './api';

const configService = {
    getAppName: () => api.get('/config/app-name'),
    updateAppName: (appName) => api.put('/config/app-name', { appName })
};

export default configService;

