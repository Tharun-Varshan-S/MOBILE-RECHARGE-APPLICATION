const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const promoteToAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mobile_recharge_app');
        console.log('MongoDB Connected');

        const email = 'qa_user_01@test.com';
        const user = await User.findOne({ email });

        if (user) {
            user.role = 'admin';
            await user.save();
            console.log(`SUCCESS: User ${email} is now an ADMIN.`);
        } else {
            console.log(`ERROR: User ${email} not found.`);
        }
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};

promoteToAdmin();
