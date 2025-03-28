const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const { getAll, getSingle, createTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactions');
const { validateTransaction, validateId, handleValidationErrors } = require('../middleware/validate');


const router = express.Router();

// transaction controller actions
router.get('/', getAll);

router.get('/:id', validateId, handleValidationErrors, getSingle);

router.post('/', requiresAuth(), validateTransaction, handleValidationErrors, createTransaction);

router.put('/:id', requiresAuth(), validateId, validateTransaction, handleValidationErrors, updateTransaction);

router.delete('/:id', requiresAuth(), validateId, handleValidationErrors, deleteTransaction);

module.exports = router;