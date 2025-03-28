const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    amount: { type: Number, required: true },
    transactionType: { type: String, enum: ['credit', 'debit'], required: true },
    date: { type: Date, default: Date.now },
    description: { type: String }
});

module.exports = mongoose.model('Transaction', transactionSchema);