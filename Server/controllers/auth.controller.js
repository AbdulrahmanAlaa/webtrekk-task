const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../configurations/defines');
const UserModel = require('../models/user.model');
const helpers = require('../shared/helper');
const authCtrl = {};

/**
 * Handle any error accures during any MongoDB Operations   
 * @param {Object} err  Error Object From mongoose That holds error informations
 */
const errorHandler = (err, res) => {
    res.status(400);
    res.send(err);
}

/** Check if the User Exists in DB */
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
            console.log('token:', token);
            return res.json({ user, token });
        });
    })(req, res);
}

authCtrl.register = (req, res, next) => {
    const reqUser = req.body || {};
    const user = new UserModel.Users(reqUser);
    const errors = user.validateSync() || {};
    const filtered = Object.keys(errors.errors || {}).map((key) => {
        return errors.errors[key] && errors.errors[key].message;
    });
    // Ensure that we do not have schema errors
    if (!filtered.length) {
        UserModel.getBy({ email: reqUser.email }).then(() => {
            res.status(400);
            res.send(`${reqUser.email} already exists`);
        }, (error) => {
            UserModel.create(user).then((data) => {
                delete data.password;
                res.send(helpers.createResponse(data));
            }, (error) => errorHandler(error, res));
        });
    } else {
        res.status(400);
        res.send(filtered);
    }
}
module.exports = authCtrl;