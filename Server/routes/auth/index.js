const express = require('express');
const router = express.Router();
const passport = require('passport');

const authCtrl = require('../../controllers/auth.controller');

/** Login Module Routes */
router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), authCtrl.facebook);

router.get('/google', passport.authenticate('google', { scope: ['email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authCtrl.google);

router.get('/linkedin', passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));
router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), authCtrl.linkedin);
module.exports = router;


