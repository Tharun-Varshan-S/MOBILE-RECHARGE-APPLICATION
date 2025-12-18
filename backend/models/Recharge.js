const mongoose = require('mongoose');

const rechargeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required: false // Optional if custom amount
    },
    mobileNumber: {
        type: String,
        required: true
    },
    operator: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Success', 'Failed'],
        default: 'Success' // For simulation we assume success mostly
    },
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    paymentMode: {
        type: String,
        default: 'UPI'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Recharge', rechargeSchema);
