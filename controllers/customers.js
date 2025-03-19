const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Customers']
    const result = await mongodb.getDatabase().db().collection('customers').find();
    result.toArray().then((customers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Customers']
    const customerId = new ObjectId(req.params.id);

    try {
        const result = await mongodb.getDatabase().db().collection('customers').findOne({ _id: customerId });
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
    const customer = {
        customerId: req.body.customerId,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        createdAt: new Date(),
        isActive: req.body.isActive
    };
    const response = await mongodb.getDatabase().db().collection('customers').insertOne(customer);
    if (response.acknowledged) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the customer');
    }
};

const updateCustomer = async (req, res) => {
    //#swagger.tags=['Customers']
    const customerId = new ObjectId(req.params.id);
    const customer = {
        userId: req.body.userId,
        amount: req.body.amount,
        currency: req.body.currency,
        type: req.body.type,
        date: new Date(), // get the current timestamp
        status: req.body.status
    };
    const response = await mongodb.getDatabase().db().collection('customers').updateOne(
        { _id: customerId },
        { $set: customer }
    );
    if (response.modifiedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the customer');
    }
};

const deleteCustomer = async (req, res) => {
    //#swagger.tags=['Customers']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid customer ID' });
    }

    const customerId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDatabase().db().collection('customers').deleteOne({ _id: customerId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Error occurred while deleting the customer');
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