const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });
        
        user = new User({ username, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login user
 const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });

        req.login(user, (err) => {
            if (err) return next(err);
            res.json({ message: 'Login successful', user });
        });
    })(req, res, next);
};

// Logout user
const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: 'Logout failed' });
        res.json({ message: 'Logged out successfully' });
    });
};

// Get current user
const getCurrentUser = (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    res.json({ message: 'Welcome, Admin!' });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
};