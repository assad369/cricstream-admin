const AppConfig = require('../models/AppConfig');
const { createApiResponse } = require('../utils/helpers');

// @desc    Get app name
// @route   GET /api/config/app-name
// @access  Public
exports.getAppName = async (req, res, next) => {
    try {
        const doc = await AppConfig.findOne({ key: 'appName' });
        const appName = doc?.value || 'Sports Admin';
        res.status(200).json(createApiResponse(true, 'App name fetched', { appName }));
    } catch (err) {
        next(err);
    }
};

// @desc    Update app name
// @route   PUT /api/config/app-name
// @access  Private (admin)
exports.updateAppName = async (req, res, next) => {
    try {
        const { appName } = req.body;
        if (!appName || typeof appName !== 'string') {
            return res.status(400).json(createApiResponse(false, 'appName is required'));
        }
        const updated = await AppConfig.findOneAndUpdate(
            { key: 'appName' },
            { value: appName },
            { new: true, upsert: true }
        );
        res.status(200).json(createApiResponse(true, 'App name updated', { appName: updated.value }));
    } catch (err) {
        next(err);
    }
};

