const cron = require('node-cron');
const Stream = require('../models/Stream');
const Announcement = require('../models/Announcement');
const Ad = require('../models/Ad');
const logger = require('./logger');

// Function to delete expired streams
const deleteExpiredStreams = async () => {
    try {
        const now = new Date();
        const result = await Stream.deleteMany({ expiryTime: { $lt: now } });
        logger.info(`Deleted ${result.deletedCount} expired streams`);
    } catch (error) {
        logger.error(`Error deleting expired streams: ${error.message}`);
    }
};

// Function to deactivate expired announcements
const deactivateExpiredAnnouncements = async () => {
    try {
        const now = new Date();
        const result = await Announcement.updateMany(
            { expiryDate: { $lt: now }, isActive: true },
            { isActive: false }
        );
        logger.info(`Deactivated ${result.modifiedCount} expired announcements`);
    } catch (error) {
        logger.error(`Error deactivating expired announcements: ${error.message}`);
    }
};

// Function to deactivate expired ads
const deactivateExpiredAds = async () => {
    try {
        const now = new Date();
        const result = await Ad.updateMany(
            { expiryDate: { $lt: now }, isActive: true },
            { isActive: false }
        );
        logger.info(`Deactivated ${result.modifiedCount} expired ads`);
    } catch (error) {
        logger.error(`Error deactivating expired ads: ${error.message}`);
    }
};

// Start all cron jobs
const startCronJobs = () => {
    // Run every hour at minute 0
    cron.schedule('0 * * * *', deleteExpiredStreams);

    // Run every day at midnight
    cron.schedule('0 0 * * *', deactivateExpiredAnnouncements);

    // Run every day at midnight
    cron.schedule('0 0 * * *', deactivateExpiredAds);

    logger.info('Cron jobs started');
};

module.exports = {
    startCronJobs,
    deleteExpiredStreams,
    deactivateExpiredAnnouncements,
    deactivateExpiredAds
};