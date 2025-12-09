const SocialLink = require('../models/SocialLink');
const { createApiResponse, createPagination } = require('../utils/helpers');

// @desc    Get all social links
// @route   GET /api/social-links
// @access  Private
exports.getSocialLinks = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const sort = req.query.sort || 'order';
        const isActive = req.query.isActive;

        // Build query
        const query = {};

        if (isActive !== undefined) {
            query.isActive = isActive === 'true';
        }

        // Execute query
        const total = await SocialLink.countDocuments(query);
        const socialLinks = await SocialLink.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        const pagination = createPagination(page, limit, total);

        res.status(200).json(createApiResponse(true, 'Social links retrieved successfully', socialLinks, pagination));
    } catch (error) {
        next(error);
    }
};

// @desc    Get single social link
// @route   GET /api/social-links/:id
// @access  Private
exports.getSocialLink = async (req, res, next) => {
    try {
        const socialLink = await SocialLink.findById(req.params.id);

        if (!socialLink) {
            return res.status(404).json(createApiResponse(false, 'Social link not found'));
        }

        res.status(200).json(createApiResponse(true, 'Social link retrieved successfully', socialLink));
    } catch (error) {
        next(error);
    }
};

// @desc    Create new social link
// @route   POST /api/social-links
// @access  Private
exports.createSocialLink = async (req, res, next) => {
    try {
        const socialLink = await SocialLink.create(req.body);

        res.status(201).json(createApiResponse(true, 'Social link created successfully', socialLink));
    } catch (error) {
        next(error);
    }
};

// @desc    Update social link
// @route   PUT /api/social-links/:id
// @access  Private
exports.updateSocialLink = async (req, res, next) => {
    try {
        const socialLink = await SocialLink.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!socialLink) {
            return res.status(404).json(createApiResponse(false, 'Social link not found'));
        }

        res.status(200).json(createApiResponse(true, 'Social link updated successfully', socialLink));
    } catch (error) {
        next(error);
    }
};

// @desc    Delete social link
// @route   DELETE /api/social-links/:id
// @access  Private
exports.deleteSocialLink = async (req, res, next) => {
    try {
        const socialLink = await SocialLink.findById(req.params.id);

        if (!socialLink) {
            return res.status(404).json(createApiResponse(false, 'Social link not found'));
        }

        await SocialLink.deleteOne({ _id: req.params.id });

        res.status(200).json(createApiResponse(true, 'Social link deleted successfully'));
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle social link active status
// @route   PUT /api/social-links/:id/toggle-active
// @access  Private
exports.toggleActiveStatus = async (req, res, next) => {
    try {
        const socialLink = await SocialLink.findById(req.params.id);

        if (!socialLink) {
            return res.status(404).json(createApiResponse(false, 'Social link not found'));
        }

        socialLink.isActive = !socialLink.isActive;
        await socialLink.save();

        res.status(200).json(createApiResponse(true, 'Social link active status updated', socialLink));
    } catch (error) {
        next(error);
    }
};