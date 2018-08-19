const express = require('express');
const router = express.Router();

const authCtrl = require('../../controllers/auth.controller');

/** Login Module Routes */
router.post('/login',authCtrl.login);

module.exports = router;


