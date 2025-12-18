const express = require('express');
const router = express.Router();
const { processRecharge, getRechargeHistory, getAllRecharges, getAdminStats } = require('../controllers/rechargeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, processRecharge);
router.get('/history', protect, getRechargeHistory);
router.get('/all', protect, admin, getAllRecharges);
router.get('/stats', protect, admin, getAdminStats);

module.exports = router;
