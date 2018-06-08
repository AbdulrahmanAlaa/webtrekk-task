//fetching all routes files.
const express = require('express');
const router = express.Router();
const customersRoutes = require('./customers');

/** Initilizing Customer Module Routes */
router.use('/customers', customersRoutes);

module.exports = router;