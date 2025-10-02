const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');
const {
    getAnnouncements,
    getAnnouncement,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    toggleActiveStatus
} = require('../controllers/announcementController');

const router = express.Router();

router.use(protect);
router.use(authorize('admin', 'moderator'));

router.route('/')
    .get(getAnnouncements)
    .post(validate('announcementSchema'), createAnnouncement);

router.route('/:id')
    .get(getAnnouncement)
    .put(validate('announcementSchema'), updateAnnouncement)
    .delete(deleteAnnouncement);

router.route('/:id/toggle-active')
    .put(toggleActiveStatus);

module.exports = router;