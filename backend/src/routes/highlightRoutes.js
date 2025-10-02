const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');
const {
    getHighlights,
    getHighlight,
    createHighlight,
    updateHighlight,
    deleteHighlight
} = require('../controllers/highlightController');

const router = express.Router();

router.use(protect);
router.use(authorize('admin', 'moderator'));

router.route('/')
    .get(getHighlights)
    .post(validate('highlightSchema'), createHighlight);

router.route('/:id')
    .get(getHighlight)
    .put(validate('highlightSchema'), updateHighlight)
    .delete(deleteHighlight);

module.exports = router;