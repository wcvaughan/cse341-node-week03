const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    //#swagger.tags=['Customers']
    try {
        const result = await mongodb.getDatabase().db().collection('customers').find().toArray();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    //#swagger.tags=['Customers']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid Customer ID' });
    }
    try {
        const customerId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('customers').findOne({ _id: customerId });

        if (!result) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const createCustomer = async (req, res, next) => {
    //#swagger.tags=['Customers']
    try {
        const customer = {
            customerId: req.body.customerId,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            createdAt: new Date(),
            isActive: req.body.isActive,
            roles: req.body.roles || []
        };
        const response = await mongodb.getDatabase().db().collection('customers').insertOne(customer);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Customer created successfully' });
        } else {
            throw new Error('Failed to create customer');
        }
    } catch (err) {
        next(err);
    }
};

const updateCustomer = async (req, res, next) => {
    //#swagger.tags=['Customers']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid customer ID' });
    }

    try {
        const customerId = new ObjectId(req.params.id);
        const customer = {
            customerId: req.body.customerId,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            isActive: req.body.isActive,
            roles: req.body.roles || []
        };
        const response = await mongodb.getDatabase().db().collection('customers').updateOne(
            { _id: customerId },
            { $set: customer}
        );
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Customer updated successfully' });
        } else {
            res.status(500).json({ error: 'Customer not found or no changes made' });
        }
    } catch (err) {
        next(err);
    }
};

const deleteCustomer = async (req, res, next) => {
    //#swagger.tags=['Customers']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid customer ID' });
    }

    try {
        const customerId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('customers').deleteOne({ _id: customerId });

        if (response.deletedCount > 0) {
            res.status(204).json({ message: 'Customer successfully deleted'});
        } else {
            res.status(500).json({ error: 'Customer not found' });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    getSingle,
    createCustomer,
    updateCustomer,
    deleteCustomer
};