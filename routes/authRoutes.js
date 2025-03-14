const express = require('express');
const passport = require('../config/passport-config');
const router = express.Router();

// Github Authentication Route
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// Github Callback Route
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/'}), 
(req, res) => {
    res.redirect('/profile');
});

// Logout Route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.redirect('/');
    });
});

// Profile Route (Protected route)
router.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/'); // Redirect to home if not authenticated
    }
    res.json(req.user); // Return user profile info
});

module.exports = router;