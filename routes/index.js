const router = require('express').Router();

router.use('/swagger', require('./swagger'));
router.use('/transactions', require('./transactions'));
router.use('/users', require('./users'));
router.use('/customers', require('./customers'));

module.exports = router;