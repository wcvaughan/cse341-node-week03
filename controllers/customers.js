const mongodb = require('../db/connect');
const { getCollection } = require('../db/collections');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Customers']
    try {
        const result = await getCollection('customers').find();
        result.toArray().then((customers) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(customers);
        });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving customers' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Customers']
    const customerId = new ObjectId(req.params.id);

    try {
        const result = await getCollection('customers').findOne({ _id: customerId });
        if (!result) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving customer' });
    }
};

const createCustomer = async (req, res) => {
    //#swagger.tags=['Customers']
    try {
        const customer = {
            customerId: req.body.customerId,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            createdAt: new Date(),
            isActive: req.body.isActive
        };
        const response = await getCollection('customers').insertOne(customer);
        if (response.acknowledged) {
            res.status(200).send();
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while creating the customer.' });
    }
};

const updateCustomer = async (req, res) => {
    //#swagger.tags=['Customers']
    try {
        const customerId = new ObjectId(req.params.id);
        const customer = {
            customerId: req.body.customerId,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            isActive: req.body.isActive
        };
        const response = await getCollection('customers').updateOne(
            { _id: customerId },
            { $set: customer }
        );
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        if (response.matchedCount > 0) {
            res.status(200).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the customer' });
    }
};

const deleteCustomer = async (req, res) => {
    //#swagger.tags=['Customers']    
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid customer ID' });
        }

        const customerId = new ObjectId(req.params.id);
        const response = await getCollection('customers').deleteOne({ _id: customerId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('Customer not found');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting customer' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createCustomer,
    updateCustomer,
    deleteCustomer
};