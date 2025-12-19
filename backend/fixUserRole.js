const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const fixUserRole = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Get all users
        const users = await User.find({});
        console.log('\n=== ALL USERS (BEFORE) ===');
        users.forEach(user => {
            console.log(`Email: ${user.email} | Role: ${user.role} | Name: ${user.name}`);
        });

        console.log('\n=== FIXING USER ROLES ===');

        // Set admin@recharge.com to admin
        await User.updateOne(
            { email: 'admin@recharge.com' },
            { $set: { role: 'admin' } }
        );
        console.log('✅ Set admin@recharge.com to ADMIN role');

        // Set all other users to 'user' role
        const result = await User.updateMany(
            { email: { $ne: 'admin@recharge.com' } },
            { $set: { role: 'user' } }
        );
        console.log(`✅ Set ${result.modifiedCount} other users to USER role`);

        // Show updated users
        const updatedUsers = await User.find({});
        console.log('\n=== UPDATED USERS (AFTER) ===');
        updatedUsers.forEach(user => {
            const roleLabel = user.role === 'admin' ? '🔴 ADMIN' : '🔵 USER';
            console.log(`${roleLabel} | Email: ${user.email} | Name: ${user.name}`);
        });

        console.log('\n✅ Done! Now logout and login again in the browser.');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

fixUserRole();
