const express = require('express');
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.use('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/transactions', require('./transactions'));
router.use('/users', require('./users'));

module.exports = router;