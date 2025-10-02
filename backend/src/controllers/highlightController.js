const Highlight = require('../models/Highlight');
const { createApiResponse, createPagination } = require('../utils/helpers');

// @desc    Get all highlights
// @route   GET /api/highlights
// @access  Private
exports.getHighlights = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const sort = req.query.sort || '-createdAt';
        const search = req.query.search || '';
        const category = req.query.category || '';

        // Build query
        const query = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        if (category) {
            query.category = category;
        }

        // Execute query
        const total = await Highlight.countDocuments(query);
        const highlights = await Highlight.find(query)
            .populate('category', 'name slug')
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        const pagination = createPagination(page, limit, total);

        res.status(200).json(createApiResponse(true, 'Highlights retrieved successfully', highlights, pagination));
    } catch (error) {
        next(error);
    }
};

// @desc    Get single highlight
// @route   GET /api/highlights/:id
// @access  Private
exports.getHighlight = async (req, res, next) => {
    try {
        const highlight = await Highlight.findById(req.params.id).populate('category', 'name slug');

        if (!highlight) {
            return res.status(404).json(createApiResponse(false, 'Highlight not found'));
        }

        res.status(200).json(createApiResponse(true, 'Highlight retrieved successfully', highlight));
    } catch (error) {
        next(error);
    }
};

// @desc    Create new highlight
// @route   POST /api/highlights
// @access  Private
exports.createHighlight = async (req, res, next) => {
    try {
        const highlight = await Highlight.create(req.body);

        // Populate category
        await highlight.populate('category', 'name slug');

        res.status(201).json(createApiResponse(true, 'Highlight created successfully', highlight));
    } catch (error) {
        next(error);
    }
};

// @desc    Update highlight
// @route   PUT /api/highlights/:id
// @access  Private
exports.updateHighlight = async (req, res, next) => {
    try {
        const highlight = await Highlight.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!highlight) {
            return res.status(404).json(createApiResponse(false, 'Highlight not found'));
        }

        // Populate category
        await highlight.populate('category', 'name slug');

        res.status(200).json(createApiResponse(true, 'Highlight updated successfully', highlight));
    } catch (error) {
        next(error);
    }
};

// @desc    Delete highlight
// @route   DELETE /api/highlights/:id
// @access  Private
exports.deleteHighlight = async (req, res, next) => {
    try {
        const highlight = await Highlight.findById(req.params.id);

        if (!highlight) {
            return res.status(404).json(createApiResponse(false, 'Highlight not found'));
        }

        await highlight.remove();

        res.status(200).json(createApiResponse(true, 'Highlight deleted successfully'));
    } catch (error) {
        next(error);
    }
};