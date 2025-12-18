const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const listUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mobile_recharge_app');
        console.log('MongoDB Connected');
        const users = await User.find({});
        console.log('--- ALL USERS ---');
        users.forEach(u => {
            console.log(`ID: ${u._id}, Name: ${u.name}, Email: ${u.email}, Role: ${u.role}`);
        });
        console.log('-----------------');
    } catch (err) {
        console.error(err);
    } finally {
        // We must close the connection to exit the script cleanly
        await mongoose.connection.close();
        process.exit(0);
    }
};

listUsers();
