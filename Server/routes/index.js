//fetching all routes files.
const express = require('express');
const router = express.Router();
const customersRoutes = require('./customers');


//Initilizing routes for each module
router.use('/customers', customersRoutes);

module.exports = router;