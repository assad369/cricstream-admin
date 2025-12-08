const LiveTV = require('../models/LiveTV');
const { createApiResponse, createPagination } = require('../utils/helpers');

// @desc    Get all live TV channels
// @route   GET /api/live-tv
// @access  Private
exports.getLiveTvChannels = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const sort = req.query.sort || '-createdAt';
        const search = req.query.search || '';
        const category = req.query.category || '';
        const isLive = req.query.isLive;

        // Build query
        const query = {};

        if (search) {
            query.channelName = { $regex: search, $options: 'i' };
        }

        if (category) {
            query.category = category;
        }

        if (isLive !== undefined && isLive !== '') {
            query.isLive = isLive === 'true';
        }

        // Execute query
        const total = await LiveTV.countDocuments(query);
        const channels = await LiveTV.find(query)
            .populate('category', 'name slug')
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        const pagination = createPagination(page, limit, total);

        res.status(200).json(createApiResponse(true, 'Live TV channels retrieved successfully', channels, pagination));
    } catch (error) {
        next(error);
    }
};

// @desc    Get single live TV channel
// @route   GET /api/live-tv/:id
// @access  Private
exports.getLiveTvChannel = async (req, res, next) => {
    try {
        const channel = await LiveTV.findById(req.params.id).populate('category', 'name slug');

        if (!channel) {
            return res.status(404).json(createApiResponse(false, 'Live TV channel not found'));
        }

        res.status(200).json(createApiResponse(true, 'Live TV channel retrieved successfully', channel));
    } catch (error) {
        next(error);
    }
};

// @desc    Create new live TV channel
// @route   POST /api/live-tv
// @access  Private
exports.createLiveTvChannel = async (req, res, next) => {
    try {
        const channel = await LiveTV.create(req.body);

        // Populate category
        await channel.populate('category', 'name slug');

        res.status(201).json(createApiResponse(true, 'Live TV channel created successfully', channel));
    } catch (error) {
        next(error);
    }
};

// @desc    Update live TV channel
// @route   PUT /api/live-tv/:id
// @access  Private
exports.updateLiveTvChannel = async (req, res, next) => {
    try {
        const channel = await LiveTV.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!channel) {
            return res.status(404).json(createApiResponse(false, 'Live TV channel not found'));
        }

        // Populate category
        await channel.populate('category', 'name slug');

        res.status(200).json(createApiResponse(true, 'Live TV channel updated successfully', channel));
    } catch (error) {
        next(error);
    }
};

// @desc    Delete live TV channel
// @route   DELETE /api/live-tv/:id
// @access  Private
exports.deleteLiveTvChannel = async (req, res, next) => {
    try {
        const channel = await LiveTV.findById(req.params.id);

        if (!channel) {
            return res.status(404).json(createApiResponse(false, 'Live TV channel not found'));
        }

        await channel.remove();

        res.status(200).json(createApiResponse(true, 'Live TV channel deleted successfully'));
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle channel live status
// @route   PUT /api/live-tv/:id/toggle-live
// @access  Private
exports.toggleLiveStatus = async (req, res, next) => {
    try {
        const channel = await LiveTV.findById(req.params.id);

        if (!channel) {
            return res.status(404).json(createApiResponse(false, 'Live TV channel not found'));
        }

        channel.isLive = !channel.isLive;
        await channel.save();

        // Populate category
        await channel.populate('category', 'name slug');

        res.status(200).json(createApiResponse(true, 'Channel live status updated', channel));
    } catch (error) {
        next(error);
    }
};