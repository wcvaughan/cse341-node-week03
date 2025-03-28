const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
        unique: true // Auth0 user ID
    },
    name: {
        type: String,
        trim: true
    },
    profilePicture: {
        type: String
    },
    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'moderator'],
        default: 'user',
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);