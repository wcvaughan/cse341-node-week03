const express = require('express');
const { getAll, getSingle, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customers');
const { validateCustomer, validateId } = require('../middleware/validation');
const { validationResult } = require('express-validator');

const router = express.Router();

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Customer controller actions
router.get('/', getAll);

router.get('/:id', validateId, handleValidationErrors, getSingle);

router.post('/', validateCustomer, handleValidationErrors, createCustomer);

router.put('/:id', validateId, validateCustomer, handleValidationErrors, updateCustomer);

router.delete('/:id', validateId, handleValidationErrors, deleteCustomer);

module.exports = router;