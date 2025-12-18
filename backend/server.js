const express = require('express');
const mongoose = require('mongoose'); // ← ADD THIS
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/plans', require('./routes/planRoutes'));
app.use('/api/recharge', require('./routes/rechargeRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Root route
app.get('/', (req, res) => {
    res.send('Mobile Recharge API is running...');
});

// Test route
app.get("/test", async (req, res) => {
    try {
        await mongoose.connection.db.collection("test").insertOne({ msg: "MongoDB is working", time: new Date() });
        res.send("✅ MongoDB is working");
    } catch (err) {
        console.error(err);
        res.send("❌ MongoDB NOT working");
    }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
