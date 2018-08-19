const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/user.model');

passport.use(
    // Defining the passport email/password validation strategy
    new LocalStrategy((email, password, done) => {
       return Users.getOne(email, password).then((user) => {
            if (!user) {
                return done(null, false, { message: 'Incorrect email or password.' });
            } else {
                return done(null, user, { message: 'Logged In Successfully' });
            }
        }).catch((error) => done(error));
    })
);