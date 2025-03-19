const express = require('express');

const { getAll, getSingle, createTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactions');
const { validateTransaction, validateId, handleValidationErrors } = require('../middleware/validate');


const router = express.Router();

// transaction controller actions
router.get('/', getAll);

router.get('/:id', validateId, handleValidationErrors, getSingle);

router.post('/', validateTransaction, handleValidationErrors, createTransaction);

router.put('/:id', validateId, validateTransaction, handleValidationErrors, updateTransaction);

router.delete('/:id', validateId, handleValidationErrors, deleteTransaction);

module.exports = router;