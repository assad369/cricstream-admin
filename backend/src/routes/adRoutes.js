const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');
const {
    getAds,
    getAd,
    createAd,
    updateAd,
    deleteAd,
    toggleActiveStatus,
    incrementClickCount,
    incrementViewCount
} = require('../controllers/adController');

const router = express.Router();

// Public routes for ad tracking
router.route('/:id/click').put(incrementClickCount);
router.route('/:id/view').put(incrementViewCount);

// Protected routes
router.use(protect);
router.use(authorize('admin', 'moderator'));

router.route('/')
    .get(getAds)
    .post(validate('adSchema'), createAd);

router.route('/:id')
    .get(getAd)
    .put(validate('adSchema'), updateAd)
    .delete(deleteAd);

router.route('/:id/toggle-active')
    .put(toggleActiveStatus);

module.exports = router;