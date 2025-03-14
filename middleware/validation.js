const { body, param } = require('express-validator');

const validateTransaction = [
    body('userId').isMongoId().withMessage('Invalid user ID format'),
    body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be a valid number greater than 0'),
    body('currency').isString().isLength({ min: 3, max: 3 }).withMessage('Currency be a 3-letter code'),
    body('type').isIn(['credit', 'debit']).withMessage('Type must be either "credit" or "debit"'),
    body('status').optional().isIn(['pending', 'completed', 'failed']).withMessage('Invalid status'),
];

const validateUser = [
    body('name').isString().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('age').optional().isInt({ min: 0 }).withMessage('Age must be a non-negative number'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean value'),
    body('roles').optional().isArray().withMessage('Roles must be an array'),
];

const validateId = [
    param('id').isMongoId().withMessage('Invalid ID format'),
];

module.exports = {
    validateTransaction,
    validateUser,
    validateId
};