const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');
const {
    getBaseUrls,
    getBaseUrl,
    createBaseUrl,
    updateBaseUrl,
    deleteBaseUrl,
    toggleActiveStatus
} = require('../controllers/baseUrlController');

const router = express.Router();

router.use(protect);
router.use(authorize('admin', 'moderator'));

router.route('/')
    .get(getBaseUrls)
    .post(validate('baseUrlSchema'), createBaseUrl);

router.route('/:id')
    .get(getBaseUrl)
    .put(validate('baseUrlSchema'), updateBaseUrl)
    .delete(deleteBaseUrl);

router.route('/:id/toggle-active')
    .put(toggleActiveStatus);

module.exports = router;