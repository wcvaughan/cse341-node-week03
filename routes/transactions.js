const express = require('express');
const { getAll, getSingle, createTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactions');
const { validateTransaction, validateId } = require('../middleware/validation');
const { validationResult } = require('express-validator');

const router = express.Router();

const handleValidatorErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// transaction controller actions
router.get('/', getAll);

router.get('/:id', validateId, handleValidatorErrors, getSingle);

router.post('/', validateTransaction, handleValidatorErrors, createTransaction);

router.put('/:id', validateId, validateTransaction, handleValidatorErrors, updateTransaction);

router.delete('/:id', validateId, handleValidatorErrors, deleteTransaction);

module.exports = router;