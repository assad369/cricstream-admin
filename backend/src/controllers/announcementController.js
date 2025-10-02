const Announcement = require('../models/Announcement');
const { createApiResponse, createPagination } = require('../utils/helpers');

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Private
exports.getAnnouncements = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const sort = req.query.sort || '-priority -createdAt';
        const isActive = req.query.isActive;

        // Build query
        const query = {};

        if (isActive !== undefined) {
            query.isActive = isActive === 'true';
        }

        // Execute query
        const total = await Announcement.countDocuments(query);
        const announcements = await Announcement.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        const pagination = createPagination(page, limit, total);

        res.status(200).json(createApiResponse(true, 'Announcements retrieved successfully', announcements, pagination));
    } catch (error) {
        next(error);
    }
};

// @desc    Get single announcement
// @route   GET /api/announcements/:id
// @access  Private
exports.getAnnouncement = async (req, res, next) => {
    try {
        const announcement = await Announcement.findById(req.params.id);

        if (!announcement) {
            return res.status(404).json(createApiResponse(false, 'Announcement not found'));
        }

        res.status(200).json(createApiResponse(true, 'Announcement retrieved successfully', announcement));
    } catch (error) {
        next(error);
    }
};

// @desc    Create new announcement
// @route   POST /api/announcements
// @access  Private
exports.createAnnouncement = async (req, res, next) => {
    try {
        const announcement = await Announcement.create(req.body);

        res.status(201).json(createApiResponse(true, 'Announcement created successfully', announcement));
    } catch (error) {
        next(error);
    }
};

// @desc    Update announcement
// @route   PUT /api/announcements/:id
// @access  Private
exports.updateAnnouncement = async (req, res, next) => {
    try {
        const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!announcement) {
            return res.status(404).json(createApiResponse(false, 'Announcement not found'));
        }

        res.status(200).json(createApiResponse(true, 'Announcement updated successfully', announcement));
    } catch (error) {
        next(error);
    }
};

// @desc    Delete announcement
// @route   DELETE /api/announcements/:id
// @access  Private
exports.deleteAnnouncement = async (req, res, next) => {
    try {
        const announcement = await Announcement.findById(req.params.id);

        if (!announcement) {
            return res.status(404).json(createApiResponse(false, 'Announcement not found'));
        }

        await announcement.remove();

        res.status(200).json(createApiResponse(true, 'Announcement deleted successfully'));
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle announcement active status
// @route   PUT /api/announcements/:id/toggle-active
// @access  Private
exports.toggleActiveStatus = async (req, res, next) => {
    try {
        const announcement = await Announcement.findById(req.params.id);

        if (!announcement) {
            return res.status(404).json(createApiResponse(false, 'Announcement not found'));
        }

        announcement.isActive = !announcement.isActive;
        await announcement.save();

        res.status(200).json(createApiResponse(true, 'Announcement active status updated', announcement));
    } catch (error) {
        next(error);
    }
};