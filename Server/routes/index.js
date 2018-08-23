//fetching all routes files.
const express = require('express');
const router = express.Router();
const customersRoutes = require('./customers');
const authRoutes = require('./auth');
const passport = require('passport');

/** Initializing Customer Module Routes */
router.use('/customers', passport.authenticate('jwt', { session: false }), customersRoutes);
router.use('/auth', authRoutes);

module.exports = router;