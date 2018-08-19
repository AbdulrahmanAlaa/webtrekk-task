const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../configurations/defines');

const authCtrl = {};


authCtrl.login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            console.log('user:', user);
            const token = jwt.sign(user, config.JWT.SECRETE) || {};
            console.log('token:',token);
            return res.json({ user, token });
        });
    })(req, res);
}
module.exports = authCtrl;