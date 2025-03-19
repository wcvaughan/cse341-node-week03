const express = require('express');

const { getAll, getSingle, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateUser, validateId, handleValidationErrors } = require('../middleware/validate');

const router = express.Router();

// user controller actions
router.get('/', getAll);

router.get('/:id', validateId, handleValidationErrors, getSingle);

router.post('/', validateUser, handleValidationErrors, createUser);

router.put('/:id', validateId, validateUser, handleValidationErrors, updateUser);

router.delete('/:id', validateId, handleValidationErrors, deleteUser);

module.exports = router;