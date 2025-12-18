const Notification = require('../models/Notification');

// @desc    Get user notifications (Personal + Global)
// @route   GET /api/users/notifications
// @access  Private
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            $or: [
                { userId: req.user.id },
                { userId: null }
            ]
        }).sort({ createdAt: -1 }).limit(20);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all notifications (Admin only)
// @route   GET /api/users/notifications/all
// @access  Private/Admin
const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 }).limit(50);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create notification (Admin only)
// @route   POST /api/users/notifications
// @access  Private/Admin
const createNotification = async (req, res) => {
    try {
        const { title, message, type, userId } = req.body;
        const notification = await Notification.create({
            userId: userId || null,
            title,
            message,
            type: type || 'info'
        });
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getNotifications,
    createNotification,
    getAllNotifications
}
