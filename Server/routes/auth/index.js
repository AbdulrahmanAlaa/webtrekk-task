const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../configurations/defines')

const authCtrl = require('../../controllers/auth.controller');

/** Login Module Routes */
router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// { successRedirect: 'https://localhost:4200/customers', failureRedirect: '/login' }
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    const token = jwt.sign(req.user, config.JWT.SECRETE) || {};
    res.redirect(`http://localhost:4200/facebook/` + token);
});



module.exports = router;


