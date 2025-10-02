const User = require('../models/User');
const Stream = require('../models/Stream');
const LiveTV = require('../models/LiveTV');
const Highlight = require('../models/Highlight');
const Ad = require('../models/Ad');
const { createApiResponse } = require('../utils/helpers');

// @desc    Get dashboard stats
// @route   GET /api/stats/dashboard
// @access  Private
exports.getDashboardStats = async (req, res, next) => {
    try {
        // Get daily active users (users who were active in the last 24 hours)
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);

        const dailyActiveUsers = await User.countDocuments({
            lastActive: { $gte: oneDayAgo }
        });

        // Get total users
        const totalUsers = await User.countDocuments();

        // Get total streams
        const totalStreams = await Stream.countDocuments();

        // Get total TV channels
        const totalTvChannels = await LiveTV.countDocuments();

        // Get total highlights
        const totalHighlights = await Highlight.countDocuments();

        // Get total ads
        const totalAds = await Ad.countDocuments();

        // Get active ads
        const activeAds = await Ad.countDocuments({ isActive: true });

        // Get live streams
        const liveStreams = await Stream.countDocuments({ isLive: true });

        // Get live TV channels
        const liveTvChannels = await LiveTV.countDocuments({ isLive: true });

        res.status(200).json(createApiResponse(true, 'Dashboard stats retrieved successfully', {
            dailyActiveUsers,
            totalUsers,
            totalStreams,
            totalTvChannels,
            totalHighlights,
            totalAds,
            activeAds,
            liveStreams,
            liveTvChannels
        }));
    } catch (error) {
        next(error);
    }
};

// @desc    Get user stats
// @route   GET /api/stats/users
// @access  Private
exports.getUserStats = async (req, res, next) => {
    try {
        const days = parseInt(req.query.days) || 7;

        // Get user registrations for the last N days
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const userRegistrations = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                        day: { $dayOfMonth: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
            }
        ]);

        // Get daily active users for the last N days
        const dailyActiveUsers = [];

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);

            const nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);

            const count = await User.countDocuments({
                lastActive: { $gte: date, $lt: nextDate }
            });

            dailyActiveUsers.push({
                date: date.toISOString().split('T')[0],
                count
            });
        }

        // Get user role distribution
        const userRoles = await User.aggregate([
            {
                $group: {
                    _id: '$role',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json(createApiResponse(true, 'User stats retrieved successfully', {
            userRegistrations,
            dailyActiveUsers,
            userRoles
        }));
    } catch (error) {
        next(error);
    }
};

// @desc    Get content stats
// @route   GET /api/stats/content
// @access  Private
exports.getContentStats = async (req, res, next) => {
    try {
        // Get content by category
        const streamsByCategory = await Stream.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            },
            {
                $group: {
                    _id: '$category.name',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        const liveTvByCategory = await LiveTV.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            },
            {
                $group: {
                    _id: '$category.name',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        const highlightsByCategory = await Highlight.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            },
            {
                $group: {
                    _id: '$category.name',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        // Get top viewed content
        const topStreams = await Stream.find()
            .sort({ views: -1 })
            .limit(5)
            .populate('category', 'name');

        const topLiveTv = await LiveTV.find()
            .sort({ views: -1 })
            .limit(5)
            .populate('category', 'name');

        const topHighlights = await Highlight.find()
            .sort({ views: -1 })
            .limit(5)
            .populate('category', 'name');

        res.status(200).json(createApiResponse(true, 'Content stats retrieved successfully', {
            streamsByCategory,
            liveTvByCategory,
            highlightsByCategory,
            topStreams,
            topLiveTv,
            topHighlights
        }));
    } catch (error) {
        next(error);
    }
};

// @desc    Get ad stats
// @route   GET /api/stats/ads
// @access  Private
exports.getAdStats = async (req, res, next) => {
    try {
        // Get ad performance
        const adPerformance = await Ad.find()
            .sort({ clickCount: -1 })
            .limit(10);

        // Get ads by type
        const adsByType = await Ad.aggregate([
            {
                $group: {
                    _id: '$type',
                    count: { $sum: 1 },
                    totalClicks: { $sum: '$clickCount' },
                    totalViews: { $sum: '$viewCount' }
                }
            }
        ]);

        // Get ads by position
        const adsByPosition = await Ad.aggregate([
            {
                $group: {
                    _id: '$position',
                    count: { $sum: 1 },
                    totalClicks: { $sum: '$clickCount' },
                    totalViews: { $sum: '$viewCount' }
                }
            }
        ]);

        res.status(200).json(createApiResponse(true, 'Ad stats retrieved successfully', {
            adPerformance,
            adsByType,
            adsByPosition
        }));
    } catch (error) {
        next(error);
    }
};