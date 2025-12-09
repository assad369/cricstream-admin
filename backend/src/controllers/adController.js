const Ad = require('../models/Ad');
const { createApiResponse, createPagination } = require('../utils/helpers');

// @desc    Get all ads
// @route   GET /api/ads
// @access  Private
exports.getAds = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const sort = req.query.sort || '-createdAt';
        const type = req.query.type;
        const position = req.query.position;
        const isActive = req.query.isActive;

        // Build query
        const query = {};

        if (type) {
            query.type = type;
        }

        if (position) {
            query.position = position;
        }

        if (isActive !== undefined) {
            query.isActive = isActive === 'true';
        }

        // Execute query
        const total = await Ad.countDocuments(query);
        const ads = await Ad.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        const pagination = createPagination(page, limit, total);

        res.status(200).json(createApiResponse(true, 'Ads retrieved successfully', ads, pagination));
    } catch (error) {
        next(error);
    }
};

// @desc    Get single ad
// @route   GET /api/ads/:id
// @access  Private
exports.getAd = async (req, res, next) => {
    try {
        const ad = await Ad.findById(req.params.id);

        if (!ad) {
            return res.status(404).json(createApiResponse(false, 'Ad not found'));
        }

        res.status(200).json(createApiResponse(true, 'Ad retrieved successfully', ad));
    } catch (error) {
        next(error);
    }
};

// @desc    Create new ad
// @route   POST /api/ads
// @access  Private
exports.createAd = async (req, res, next) => {
    try {
        const ad = await Ad.create(req.body);

        res.status(201).json(createApiResponse(true, 'Ad created successfully', ad));
    } catch (error) {
        next(error);
    }
};

// @desc    Update ad
// @route   PUT /api/ads/:id
// @access  Private
exports.updateAd = async (req, res, next) => {
    try {
        const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!ad) {
            return res.status(404).json(createApiResponse(false, 'Ad not found'));
        }

        res.status(200).json(createApiResponse(true, 'Ad updated successfully', ad));
    } catch (error) {
        next(error);
    }
};

// @desc    Delete ad
// @route   DELETE /api/ads/:id
// @access  Private
exports.deleteAd = async (req, res, next) => {
    try {
        const ad = await Ad.findById(req.params.id);

        if (!ad) {
            return res.status(404).json(createApiResponse(false, 'Ad not found'));
        }

        await Ad.deleteOne({ _id: req.params.id });

        res.status(200).json(createApiResponse(true, 'Ad deleted successfully'));
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle ad active status
// @route   PUT /api/ads/:id/toggle-active
// @access  Private
exports.toggleActiveStatus = async (req, res, next) => {
    try {
        const ad = await Ad.findById(req.params.id);

        if (!ad) {
            return res.status(404).json(createApiResponse(false, 'Ad not found'));
        }

        ad.isActive = !ad.isActive;
        await ad.save();

        res.status(200).json(createApiResponse(true, 'Ad active status updated', ad));
    } catch (error) {
        next(error);
    }
};

// @desc    Increment ad click count
// @route   PUT /api/ads/:id/click
// @access  Public
exports.incrementClickCount = async (req, res, next) => {
    try {
        const ad = await Ad.findById(req.params.id);

        if (!ad) {
            return res.status(404).json(createApiResponse(false, 'Ad not found'));
        }

        ad.clickCount += 1;
        await ad.save();

        res.status(200).json(createApiResponse(true, 'Ad click count updated'));
    } catch (error) {
        next(error);
    }
};

// @desc    Increment ad view count
// @route   PUT /api/ads/:id/view
// @access  Public
exports.incrementViewCount = async (req, res, next) => {
    try {
        const ad = await Ad.findById(req.params.id);

        if (!ad) {
            return res.status(404).json(createApiResponse(false, 'Ad not found'));
        }

        ad.viewCount += 1;
        await ad.save();

        res.status(200).json(createApiResponse(true, 'Ad view count updated'));
    } catch (error) {
        next(error);
    }
};