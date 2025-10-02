const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Simple logger that writes to file and console
const logger = {
    info: (message) => {
        const logMessage = `[${new Date().toISOString()}] INFO: ${message}\n`;
        fs.appendFileSync(path.join(logsDir, 'app.log'), logMessage);
        console.log(logMessage);
    },

    error: (message) => {
        const logMessage = `[${new Date().toISOString()}] ERROR: ${message}\n`;
        fs.appendFileSync(path.join(logsDir, 'error.log'), logMessage);
        console.error(logMessage);
    }
};

module.exports = logger;