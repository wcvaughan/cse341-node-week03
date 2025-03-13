const express = require('express');
const router = express.Router();

const transactionsController = require('../controllers/transactions');

// transaction controller actions
router.get('/', transactionsController.getAll);
router.get('/:id', transactionsController.getSingle);
router.post('/', transactionsController.createTransaction);
router.put('/:id', transactionsController.updateTransaction);
router.delete('/:id', transactionsController.deleteTransaction);

module.exports = router;