const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

const router = express.Router();

router.use(protect);
router.use(authorize('admin', 'moderator'));

router.route('/')
    .get(getCategories)
    .post(validate('categorySchema'), createCategory);

router.route('/:id')
    .get(getCategory)
    .put(validate('categorySchema'), updateCategory)
    .delete(deleteCategory);

module.exports = router;