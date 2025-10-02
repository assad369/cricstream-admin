// Simple frontend logger with central toggle
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const logger = {
    info: (...args) => {
        if (isDev) console.info('[INFO]', ...args);
    },
    warn: (...args) => {
        if (isDev) console.warn('[WARN]', ...args);
    },
    error: (...args) => {
        if (isDev) console.error('[ERROR]', ...args);
    }
};

export default logger;

