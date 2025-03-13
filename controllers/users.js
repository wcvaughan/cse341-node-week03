const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    const transaction = {
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        createdAt: new Date(),
        isActive: req.body.isActive,
        roles: req.body.roles || []
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(transaction);
    if (response.acknowledged) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the user');
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const transaction = {
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        isActive: req.body.isActive,
        roles: req.body.roles || []
    };
    const response = await mongodb.getDatabase().db().collection('users').updateOne(transaction);
    if (response.modifiedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const userId = new ObjectId(req.params.id);
    const reponse = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};