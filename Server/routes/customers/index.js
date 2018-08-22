const customers = require('../../controllers/customers.controller');
const express = require('express');
const router = express.Router();

/** Customers Module Routes */
router.get('/', customers.get);
router.get('/:customerID', customers.getOne);
router.post('/', customers.create);
router.delete('/:customerID', customers.remove);
router.put('/', customers.update);


module.exports = router;