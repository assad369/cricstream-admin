const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');
const {
    getLiveTvChannels,
    getLiveTvChannel,
    createLiveTvChannel,
    updateLiveTvChannel,
    deleteLiveTvChannel,
    toggleLiveStatus
} = require('../controllers/liveTvController');

const router = express.Router();

router.use(protect);
router.use(authorize('admin', 'moderator'));

router.route('/')
    .get(getLiveTvChannels)
    .post(validate('liveTvSchema'), createLiveTvChannel);

router.route('/:id')
    .get(getLiveTvChannel)
    .put(validate('liveTvSchema'), updateLiveTvChannel)
    .delete(deleteLiveTvChannel);

router.route('/:id/toggle-live')
    .put(toggleLiveStatus);

module.exports = router;