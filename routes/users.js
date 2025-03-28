const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const { getAll, getSingle, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateUser, validateId, handleValidationErrors } = require('../middleware/validate');

const router = express.Router();

// user controller actions
router.get('/', getAll);

router.get('/:id', validateId, handleValidationErrors, getSingle);

router.post('/', requiresAuth(), validateUser, handleValidationErrors, createUser);

router.put('/:id', requiresAuth(), validateId, validateUser, handleValidationErrors, updateUser);

router.delete('/:id', requiresAuth(), validateId, handleValidationErrors, deleteUser);

module.exports = router;