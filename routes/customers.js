const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const { getAll, getSingle, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customers');
const { validateCustomer, validateId, handleValidationErrors } = require('../middleware/validate');


const router = express.Router();

// customer controller actions
router.get('/', getAll);

router.get('/:id', validateId, handleValidationErrors, getSingle);

router.post('/', requiresAuth(), validateCustomer, handleValidationErrors, createCustomer);

router.put('/:id', requiresAuth(), validateId, validateCustomer, handleValidationErrors, updateCustomer);

router.delete('/:id', requiresAuth(), validateId, handleValidationErrors, deleteCustomer);

module.exports = router;