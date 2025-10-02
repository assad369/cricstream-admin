const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE } = require('../config/env');
const { createApiResponse } = require('../utils/helpers');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json(createApiResponse(false, 'User already exists'));
        }

        // Create user
        const user = await User.create({
            email,
            password,
            role: role || 'moderator'
        });

        // Create token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRE
        });

        res.status(201).json(createApiResponse(true, 'User registered successfully', {
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            },
            token
        }));
    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json(createApiResponse(false, 'Please provide an email and password'));
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json(createApiResponse(false, 'Invalid credentials'));
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json(createApiResponse(false, 'Invalid credentials'));
        }

        // Update last active
        user.lastActive = Date.now();
        await user.save();

        // Create token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRE
        });

        res.status(200).json(createApiResponse(true, 'Login successful', {
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            },
            token
        }));
    } catch (error) {
        next(error);
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json(createApiResponse(true, 'User retrieved successfully', {
            user: {
                name: user.name,
                id: user._id,
                email: user.email,
                role: user.role,
                lastActive: user.lastActive
            }
        }));
    } catch (error) {
        next(error);
    }
};

// @desc    Update profile (name/email)
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        const updates = {};
        if (typeof name === 'string') updates.name = name;
        if (typeof email === 'string') updates.email = email;

        const exists = email ? await User.findOne({ email, _id: { $ne: req.user.id } }) : null;
        if (exists) {
            return res.status(400).json(createApiResponse(false, 'Email already in use'));
        }

        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });

        res.status(200).json(createApiResponse(true, 'Profile updated successfully', {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                lastActive: user.lastActive
            }
        }));
    } catch (error) {
        next(error);
    }
};

// @desc    Update user password
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id).select('+password');

        // Check current password
        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json(createApiResponse(false, 'Current password is incorrect'));
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json(createApiResponse(true, 'Password updated successfully'));
    } catch (error) {
        next(error);
    }
};