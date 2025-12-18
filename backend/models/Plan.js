const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    operator: {
        type: String,
        required: true,
        // enum: ['Airtel', 'Jio', 'Vi', 'BSNL'] // Can be strict or open
    },
    price: {
        type: Number,
        required: true
    },
    validity: {
        type: String, // e.g., "28 Days"
        required: true
    },
    data: {
        type: String, // e.g., "1.5 GB/day"
        required: true
    },
    calls: {
        type: String, // e.g., "Unlimited"
        default: "Unlimited"
    },
    sms: {
        type: String, // e.g., "100 SMS/day"
        default: "100 SMS/day"
    },
    description: {
        type: String // Additional benefits like "Disney+ Hotstar"
    },
    category: {
        type: String,
        required: true,
        default: "Popular" // e.g., Popular, Data, Topup, Validity, Annual
    },
    type: {
        type: String, // e.g., "Prepaid", "Postpaid"
        default: "Prepaid"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);
