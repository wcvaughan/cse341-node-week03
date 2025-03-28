const mongodb = require('../db/connect');
const { getCollection } = require('../db/collections');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Transactions']
    try {
        const result = await getCollection('transactions').find();
        result.toArray().then((transactions) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(transactions);
        });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving transactions' });
    };
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Transactions']
    const transactionId = new ObjectId(req.params.id);

    try {
        const result = await getCollection('transactions').findOne({ _id: transactionId});
        if(!result) {
            res.status(404).json({ error: 'Transaction not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving transaction'})
    }
};

const createTransaction = async (req, res) => {
    //#swagger.tags=['Transactions']
    try {
        const transaction = {
            customerId: req.body.customerId,
            amount: req.body.amount,
            currency: req.body.currency,
            type: req.body.type,
            date: new Date(), // get the current timestamp
            status: req.body.status
        };
        const response = await getCollection('transactions').insertOne(transaction);
        if (response.acknowledged) {
            res.status(200).send();
        }
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: error.message || 'An error occurred while creating the transaction.' });
    }
};

const updateTransaction = async (req, res) => {
    //#swagger.tags=['Transactions']
    try {
        const transactionId = new ObjectId(req.params.id);
        const transaction = {
            customerId: req.body.customerId,
            amount: req.body.amount,
            currency: req.body.currency,
            type: req.body.type,
            date: new Date(), // get the current timestamp
            status: req.body.status
        };
        const response = await getCollection('transactions').updateOne(
            { _id: transactionId },
            { $set: transaction }
        );
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        if (response.modifiedCount > 0) {
            res.status(200).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the transaction' });
    }
};

const deleteTransaction = async (req, res) => {
    //#swagger.tags=['Transactions']
 
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid transaction ID'});
        }
    
        const transactionId = new ObjectId(req.params.id);
        const response = await getCollection('transactions').deleteOne({ _id: transactionId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('Transaction not found');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting transaction'});
    }
};

module.exports = {
    getAll,
    getSingle,
    createTransaction,
    updateTransaction,
    deleteTransaction
};