const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mobile_recharge_app');
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const promoteAdmin = async () => {
    await connectDB();
    const email = 'admin_user_01@test.com';
    const user = await User.findOne({ email });
    if (user) {
        user.role = 'admin';
        await user.save();
        console.log(`User ${email} promoted to admin.`);
    } else {
        console.log(`User ${email} not found.`);
    }
    process.exit();
};

promoteAdmin();
