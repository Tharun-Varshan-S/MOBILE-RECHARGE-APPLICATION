const Recharge = require('../models/Recharge');
const Notification = require('../models/Notification');
const User = require('../models/User');

// @desc    Process new recharge
// @route   POST /api/recharge
// @access  Private
const processRecharge = async (req, res) => {
    const { planId, mobileNumber, operator, amount, paymentMode } = req.body;

    if (!mobileNumber || !operator || !amount) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    // Generate a unique transaction ID
    const transactionId = 'TXN' + Date.now() + Math.round(Math.random() * 10000);
    const status = 'Success'; // In a real app, this would depend on payment gateway response

    try {
        const recharge = await Recharge.create({
            userId: req.user.id,
            planId: planId || null,
            mobileNumber,
            operator,
            amount,
            status,
            transactionId,
            paymentMode: paymentMode || 'UPI'
        });

        // Add a notification for the user
        await Notification.create({
            userId: req.user.id,
            title: 'Recharge Successful',
            message: `Recharge of ₹${amount} for ${mobileNumber} was successful. Transaction ID: ${transactionId}`,
            type: 'success'
        });

        res.status(201).json(recharge);
    } catch (error) {
        console.error('Recharge error:', error);
        res.status(500).json({ message: 'Failed to process recharge. Please contact support.' });
    }
};

// @desc    Get user recharge history
// @route   GET /api/recharge/history
// @access  Private
const getRechargeHistory = async (req, res) => {
    try {
        const history = await Recharge.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all recharges (Admin only)
// @route   GET /api/recharge/all
// @access  Private/Admin
const getAllRecharges = async (req, res) => {
    try {
        const history = await Recharge.find().sort({ createdAt: -1 }).limit(50);
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Admin Stats
// @route   GET /api/recharge/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const allRecharges = await Recharge.find();

        const totalRevenue = allRecharges.reduce((sum, item) => sum + item.amount, 0);
        const successCount = allRecharges.filter(r => r.status === 'Success').length;

        // Recently active plans could be dummy or counts
        const activePlans = await require('../models/Plan').countDocuments();

        res.status(200).json({
            totalUsers,
            totalRevenue,
            totalTransactions: allRecharges.length,
            successCount,
            activePlans,
            pendingIssues: 0 // Mock for now
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    processRecharge,
    getRechargeHistory,
    getAllRecharges,
    getAdminStats
};
