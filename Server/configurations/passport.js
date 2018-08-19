const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/user.model');
const { ExtractJwt, Strategy:JWTStrategy } = require('passport-jwt');
const config = require('./defines');
passport.use(
    // Defining the passport email/password validation strategy
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {
        return Users.getOne(email, password).then((user) => {
            if (!user) {
                return done(null, false, { message: 'Incorrect email or password.' });
            } else {
                return done(null, user, { message: 'Logged In Successfully' });
            }
        }).catch((error) => done(error));
    })
);
passport.use(
    new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey   : config.JWT.SECRETE
    },(jwtPayload, cb)=>{
        // console.log('jwtPayload',jwtPayload);
        return cb(null, jwtPayload);
    })
)