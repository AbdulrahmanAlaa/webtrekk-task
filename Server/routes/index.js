//fetching all routes files.
const express = require('express');
const router = express.Router();
const customersRoutes = require('./customers');
const authRoutes = require('./auth');

/** Initializing Customer Module Routes */
router.use('/customers', customersRoutes);
router.use('/auth', authRoutes);

module.exports = router;