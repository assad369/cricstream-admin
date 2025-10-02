const express = require('express');
const { protect } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');
const {
    register,
    login,
    getMe,
    updatePassword,
    updateProfile
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', validate('userSchema'), register);
router.post('/login', validate('loginSchema'), login);
router.get('/me', protect, getMe);
router.put('/updatepassword', protect, updatePassword);
router.put('/profile', protect, updateProfile);

module.exports = router;