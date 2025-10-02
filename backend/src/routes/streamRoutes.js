const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');
const {
    getStreams,
    getStream,
    createStream,
    updateStream,
    deleteStream,
    toggleLiveStatus
} = require('../controllers/streamController');

const router = express.Router();

router.use(protect);
router.use(authorize('admin', 'moderator'));

router.route('/')
    .get(getStreams)
    .post(validate('streamSchema'), createStream);

router.route('/:id')
    .get(getStream)
    .put(validate('streamSchema'), updateStream)
    .delete(deleteStream);

router.route('/:id/toggle-live')
    .put(toggleLiveStatus);

module.exports = router;