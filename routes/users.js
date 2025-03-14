const express = require('express');
const { registerUser, loginUser, logoutUser, getCurrentUser } = require('../controllers/users');
const { validateUser } = require('../middleware/validation');
const { validationResult } = require('express-validator');

const router = express.Router();

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// User authentication routes
router.post('/register', validateUser, handleValidationErrors, registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/current', getCurrentUser);

module.exports = router;