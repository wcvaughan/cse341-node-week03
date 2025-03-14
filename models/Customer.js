const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define customer schema
const customerSchema = new mongoose.Schema({
    customerId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.Now
    }
});

// Create customer model
const customer = mongoose.model('customer', customerSchema);

module.exports = customer;