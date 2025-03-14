const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists '});
        }
    
        // Create new user
        const user = new User({ username, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error});
    }
    const { username, email, password, role } = req.body;

});

// Login Route using Passport.js
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect to the dashboard or other protected routes
    failureRedirect: '/login', // Redirect to login page on failure
    failureFlash: true // Optional, for flash messages on failure
}));

// Logout Route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// Admin route
router.get('/admin-dashboard', (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        res.send('Welcome to the Admin Dashboard!');
    } else {
        res.status(403).send('You do not have permission to access this page.');
    }
});

module.exports = router;