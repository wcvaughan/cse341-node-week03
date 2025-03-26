const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const result = await mongodb.getDatabase().db().collection('users').find();
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users);
        });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);

    try {
        const result = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });
        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user' });
    }
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            isActive: req.body.isActive,
            createdAt: new Date()
        };
        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
        if (response.acknowledged) {
            res.status(200).send();
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message || 'An error occurred while creating the user.' });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            isActive: req.body.isActive,
            updatedAt: new Date()
        };
        const response = await mongodb.getDatabase().db().collection('users').updateOne(
            { _id: userId },
            { $set: user }
        );
        if (response.modifiedCount > 0) {
            res.status(200).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the user' });
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']    
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
    
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('User not found');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};