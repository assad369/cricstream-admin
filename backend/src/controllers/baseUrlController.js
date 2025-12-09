const BaseURL = require('../models/BaseURL');
const { createApiResponse, createPagination } = require('../utils/helpers');

// @desc    Get all base URLs
// @route   GET /api/base-urls
// @access  Private
exports.getBaseUrls = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const sort = req.query.sort || '-createdAt';
        const isActive = req.query.isActive;

        // Build query
        const query = {};

        if (isActive !== undefined) {
            query.isActive = isActive === 'true';
        }

        // Execute query
        const total = await BaseURL.countDocuments(query);
        const baseUrls = await BaseURL.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        const pagination = createPagination(page, limit, total);

        res.status(200).json(createApiResponse(true, 'Base URLs retrieved successfully', baseUrls, pagination));
    } catch (error) {
        next(error);
    }
};

// @desc    Get single base URL
// @route   GET /api/base-urls/:id
// @access  Private
exports.getBaseUrl = async (req, res, next) => {
    try {
        const baseUrl = await BaseURL.findById(req.params.id);

        if (!baseUrl) {
            return res.status(404).json(createApiResponse(false, 'Base URL not found'));
        }

        res.status(200).json(createApiResponse(true, 'Base URL retrieved successfully', baseUrl));
    } catch (error) {
        next(error);
    }
};

// @desc    Create new base URL
// @route   POST /api/base-urls
// @access  Private
exports.createBaseUrl = async (req, res, next) => {
    try {
        const baseUrl = await BaseURL.create(req.body);

        res.status(201).json(createApiResponse(true, 'Base URL created successfully', baseUrl));
    } catch (error) {
        next(error);
    }
};

// @desc    Update base URL
// @route   PUT /api/base-urls/:id
// @access  Private
exports.updateBaseUrl = async (req, res, next) => {
    try {
        const baseUrl = await BaseURL.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!baseUrl) {
            return res.status(404).json(createApiResponse(false, 'Base URL not found'));
        }

        res.status(200).json(createApiResponse(true, 'Base URL updated successfully', baseUrl));
    } catch (error) {
        next(error);
    }
};

// @desc    Delete base URL
// @route   DELETE /api/base-urls/:id
// @access  Private
exports.deleteBaseUrl = async (req, res, next) => {
    try {
        const baseUrl = await BaseURL.findById(req.params.id);

        if (!baseUrl) {
            return res.status(404).json(createApiResponse(false, 'Base URL not found'));
        }

        await BaseURL.deleteOne({ _id: req.params.id });

        res.status(200).json(createApiResponse(true, 'Base URL deleted successfully'));
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle base URL active status
// @route   PUT /api/base-urls/:id/toggle-active
// @access  Private
exports.toggleActiveStatus = async (req, res, next) => {
    try {
        const baseUrl = await BaseURL.findById(req.params.id);

        if (!baseUrl) {
            return res.status(404).json(createApiResponse(false, 'Base URL not found'));
        }

        baseUrl.isActive = !baseUrl.isActive;
        await baseUrl.save();

        res.status(200).json(createApiResponse(true, 'Base URL active status updated', baseUrl));
    } catch (error) {
        next(error);
    }
};