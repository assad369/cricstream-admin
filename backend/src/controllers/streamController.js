const Stream = require('../models/Stream');
const { createApiResponse, createPagination } = require('../utils/helpers');

// @desc    Get all streams
// @route   GET /api/streams
// @access  Private
exports.getStreams = async (req, res, next) => {
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
            query.title = { $regex: search, $options: 'i' };
        }

        if (category) {
            query.category = category;
        }

        if (isLive !== undefined) {
            query.isLive = isLive === 'true';
        }

        // Execute query
        const total = await Stream.countDocuments(query);
        const streams = await Stream.find(query)
            .populate('category', 'name slug')
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        const pagination = createPagination(page, limit, total);

        res.status(200).json(createApiResponse(true, 'Streams retrieved successfully', streams, pagination));
    } catch (error) {
        next(error);
    }
};

// @desc    Get single stream
// @route   GET /api/streams/:id
// @access  Private
exports.getStream = async (req, res, next) => {
    try {
        const stream = await Stream.findById(req.params.id).populate('category', 'name slug');

        if (!stream) {
            return res.status(404).json(createApiResponse(false, 'Stream not found'));
        }

        res.status(200).json(createApiResponse(true, 'Stream retrieved successfully', stream));
    } catch (error) {
        next(error);
    }
};

// @desc    Create new stream
// @route   POST /api/streams
// @access  Private
exports.createStream = async (req, res, next) => {
    try {
        const stream = await Stream.create(req.body);

        // Populate category
        await stream.populate('category', 'name slug');

        res.status(201).json(createApiResponse(true, 'Stream created successfully', stream));
    } catch (error) {
        next(error);
    }
};

// @desc    Update stream
// @route   PUT /api/streams/:id
// @access  Private
exports.updateStream = async (req, res, next) => {
    try {
        const stream = await Stream.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!stream) {
            return res.status(404).json(createApiResponse(false, 'Stream not found'));
        }

        // Populate category
        await stream.populate('category', 'name slug');

        res.status(200).json(createApiResponse(true, 'Stream updated successfully', stream));
    } catch (error) {
        next(error);
    }
};

// @desc    Delete stream
// @route   DELETE /api/streams/:id
// @access  Private
exports.deleteStream = async (req, res, next) => {
    try {
        const stream = await Stream.findById(req.params.id);

        if (!stream) {
            return res.status(404).json(createApiResponse(false, 'Stream not found'));
        }

        await stream.remove();

        res.status(200).json(createApiResponse(true, 'Stream deleted successfully'));
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle stream live status
// @route   PUT /api/streams/:id/toggle-live
// @access  Private
exports.toggleLiveStatus = async (req, res, next) => {
    try {
        const stream = await Stream.findById(req.params.id);

        if (!stream) {
            return res.status(404).json(createApiResponse(false, 'Stream not found'));
        }

        stream.isLive = !stream.isLive;
        await stream.save();

        // Populate category
        await stream.populate('category', 'name slug');

        res.status(200).json(createApiResponse(true, 'Stream live status updated', stream));
    } catch (error) {
        next(error);
    }
};