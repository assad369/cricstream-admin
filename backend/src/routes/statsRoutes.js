const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const {
    getDashboardStats,
    getUserStats,
    getContentStats,
    getAdStats
} = require('../controllers/statsController');

const router = express.Router();

router.use(protect);
router.use(authorize('admin', 'moderator'));

router.route('/dashboard').get(getDashboardStats);
router.route('/users').get(getUserStats);
router.route('/content').get(getContentStats);
router.route('/ads').get(getAdStats);

module.exports = router;