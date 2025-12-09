const Category = require('../models/Category');
const { createApiResponse, generateSlug, createPagination } = require('../utils/helpers');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
exports.getCategories = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const sort = req.query.sort || '-createdAt';
        const search = req.query.search || '';

        // Build query
        const query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        // Execute query
        const total = await Category.countDocuments(query);
        const categories = await Category.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        const pagination = createPagination(page, limit, total);

        res.status(200).json(createApiResponse(true, 'Categories retrieved successfully', categories, pagination));
    } catch (error) {
        next(error);
    }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Private
exports.getCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json(createApiResponse(false, 'Category not found'));
        }

        res.status(200).json(createApiResponse(true, 'Category retrieved successfully', category));
    } catch (error) {
        next(error);
    }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private
exports.createCategory = async (req, res, next) => {
    try {
        // Generate slug if not provided
        if (!req.body.slug) {
            req.body.slug = generateSlug(req.body.name);
        }

        const category = await Category.create(req.body);

        res.status(201).json(createApiResponse(true, 'Category created successfully', category));
    } catch (error) {
        next(error);
    }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
exports.updateCategory = async (req, res, next) => {
    try {
        // Generate slug if name is updated but slug is not provided
        if (req.body.name && !req.body.slug) {
            req.body.slug = generateSlug(req.body.name);
        }

        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!category) {
            return res.status(404).json(createApiResponse(false, 'Category not found'));
        }

        res.status(200).json(createApiResponse(true, 'Category updated successfully', category));
    } catch (error) {
        next(error);
    }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json(createApiResponse(false, 'Category not found'));
        }

        await Category.deleteOne({ _id: req.params.id });

        res.status(200).json(createApiResponse(true, 'Category deleted successfully'));
    } catch (error) {
        next(error);
    }
};