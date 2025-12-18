const express = require('express');
const router = express.Router();
const { getNotifications, createNotification, getAllNotifications } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/notifications', protect, getNotifications);
router.get('/notifications/all', protect, admin, getAllNotifications);
router.post('/notifications', protect, admin, createNotification);

module.exports = router;
