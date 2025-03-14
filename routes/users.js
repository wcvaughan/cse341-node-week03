const express = require('express');
const { getAll, getSingle, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateUser, validateId } = require('../middleware/validation');
const { validationResult } = require('express-validator');

const router = express.Router();

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// user controller actions
router.get('/', getAll);

router.get('/:id', validateId, handleValidationErrors, getSingle);

router.post('/', validateUser, handleValidationErrors, createUser);

router.put('/:id', validateId, validateUser, handleValidationErrors, updateUser);

router.delete('/:id', validateId, handleValidationErrors, deleteUser);

module.exports = router;