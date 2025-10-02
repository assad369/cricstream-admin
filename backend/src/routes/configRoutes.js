const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { getAppName, updateAppName } = require('../controllers/appConfigController');

const router = express.Router();

router.get('/app-name', getAppName);
router.put('/app-name', protect, authorize('admin'), updateAppName);

module.exports = router;

