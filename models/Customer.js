const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: {
        street: {type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String }
    },
    createdAt: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);