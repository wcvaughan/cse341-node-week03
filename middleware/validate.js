const { body, param } = require('express-validator');
const { validationResult } = require('express-validator');

const validateTransaction = [
    body('userId').isInt().withMessage('Invalid user ID format'),
    body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be a valid number greater than 0'),
    body('currency').isString().isLength({ min: 3, max: 3 }).withMessage('Currency be a 3-letter code'),
    body('type').isIn(['credit', 'debit']).withMessage('Type must be either "credit" or "debit"'),
    body('status').optional().isIn(['pending', 'completed', 'failed']).withMessage('Invalid status'),
];

const validateCustomer = [
    body('name').trim().isString().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('email').normalizeEmail().isEmail().withMessage('Invalid email format'),
    body('age').optional().isInt({ min: 0 }).withMessage('Age must be a non-negative number'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean value'),
];

const validateUser = [
    body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').normalizeEmail().isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').optional().isIn(['admin', 'user', 'moderator']).withMessage('Invalid role'),
];

const validateId = [
    param('id').isMongoId().withMessage('Invalid ID format'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateTransaction,
    validateCustomer,
    validateUser,
    validateId,
    handleValidationErrors
};