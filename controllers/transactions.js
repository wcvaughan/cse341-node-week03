const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Transactions']
    const result = await mongodb.getDatabase().db().collection('transactions').find();
    result.toArray().then((transactions) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(transactions);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Transactions']
    const transactionId = new ObjectId(req.params.id);

    try {
        const result = await mongodb.getDatabase().db().collection('transactions').findOne({ _id: transactionId});
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
    const transaction = {
        userId: req.body.userId,
        amount: req.body.amount,
        currency: req.body.currency,
        type: req.body.type,
        date: new Date(), // get the current timestamp
        status: req.body.status
    };
    const response = await mongodb.getDatabase().db().collection('transactions').insertOne(transaction);
    if (response.acknowledged) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the transaction');
    }
};

const updateTransaction = async (req, res) => {
    //#swagger.tags=['Transactions']
    const transactionId = new ObjectId(req.params.id);
    const transaction = {
        userId: req.body.userId,
        amount: req.body.amount,
        currency: req.body.currency,
        type: req.body.type,
        date: new Date(), // get the current timestamp
        status: req.body.status
    };
    const response = await mongodb.getDatabase().db().collection('transactions').updateOne(
        { _id: transactionId },
        { $set: transaction }
    );
    if (response.modifiedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the transaction');
    }
};

const deleteTransaction = async (req, res) => {
    //#swagger.tags=['Transactions']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid transaction ID'});
    }

    const transactionId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDatabase().db().collection('transactions').deleteOne({ _id: transactionId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the transaction');
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