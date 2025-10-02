const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');
const {
    getSocialLinks,
    getSocialLink,
    createSocialLink,
    updateSocialLink,
    deleteSocialLink,
    toggleActiveStatus
} = require('../controllers/socialLinkController');

const router = express.Router();

router.use(protect);
router.use(authorize('admin', 'moderator'));

router.route('/')
    .get(getSocialLinks)
    .post(validate('socialLinkSchema'), createSocialLink);

router.route('/:id')
    .get(getSocialLink)
    .put(validate('socialLinkSchema'), updateSocialLink)
    .delete(deleteSocialLink);

router.route('/:id/toggle-active')
    .put(toggleActiveStatus);

module.exports = router;