const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define transaction schema
const transactionSchema = new mongoose.Schema({
    transactionId: {
        type: Number,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Double,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String
    }
});

// Create transaction model
const transaction = mongoose.model('transaction', transactionSchema);

module.exports = transaction;