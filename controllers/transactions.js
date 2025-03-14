const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    //#swagger.tags=['Transactions']
    try  {
        const result = await mongodb.getDatabase().db().collection('transactions').find();
        result.toArray().then((transactions) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(transactions);
        });
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    //#swagger.tags=['Transactions']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid transaction ID' });
    }
    try {
        const transactionId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('transactions').findOne({ _id: transactionId});

        if (!result) {
            return res.status(404).json({ error: 'Transaction not found '});
        }

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const createTransaction = async (req, res, next) => {
    //#swagger.tags=['Transactions']
    try {
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
            res.status(201).json({ message: 'Transaction created successfully' });
        } else {
            throw new Error('Failed to create transaction');
        }
    } catch (err) {
        next(err);
    }
};

const updateTransaction = async (req, res, next) => {
    //#swagger.tags=['Transactions']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid transaction ID' });
    }
    try {
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
            res.status(200).json({ message: 'Transaction updated successfully'});
        } else {
            res.status(500).json({ error: 'Transaction not found or no changes made' });
        }
    } catch (err) {
        next(err);
    }
};

const deleteTransaction = async (req, res, next) => {
    //#swagger.tags=['Transactions']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid transaction ID'});
    }
    try {
        const transactionId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('transactions').deleteOne({ _id: transactionId });
        if (response.deletedCount > 0) {
            res.status(204).json({ message: 'Transaction successfully deleted'});
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the transaction');
        }
    } catch (err) {
        next(err);
    }

};

module.exports = {
    getAll,
    getSingle,
    createTransaction,
    updateTransaction,
    deleteTransaction
};