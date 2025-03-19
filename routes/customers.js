const express = require('express');
const { getAll, getSingle, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customers');
const { validateCustomer, validateId, handleValidationErrors } = require('../middleware/validate');


const router = express.Router();

// customer controller actions
router.get('/', getAll);

router.get('/:id', validateId, handleValidationErrors, getSingle);

router.post('/', validateCustomer, handleValidationErrors, createCustomer);

router.put('/:id', validateId, validateCustomer, handleValidationErrors, updateCustomer);

router.delete('/:id', validateId, handleValidationErrors, deleteCustomer);

module.exports = router;