module.exports = (app) => {

    //fetching all routes files.
    const passport = require('passport');

    // Strategies
    const LocalStrategy = require('passport-local').Strategy;
    const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
    const FacebookStrategy = require('passport-facebook').Strategy;

    const Users = require('../models/user.model');
    const config = require('./defines');

    // Store User information in Server Session 
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        console.log('deserializeUser', user)
        Users.getBy({ _id: id }).then((err, user) => {
            done(err, user);
        }, done);
    });

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
            secretOrKey: config.JWT.SECRETE
        }, (jwtPayload, cb) => {
            // console.log('jwtPayload',jwtPayload);
            return cb(null, jwtPayload);
        })
    );

    passport.use(new FacebookStrategy(
        {
            clientID: config.FACEBOOK.APP_ID,
            clientSecret: config.FACEBOOK.SECRET,
            callbackURL: "http://localhost:8080/api/auth/facebook/callback",
            profileFields: ['id', 'emails', 'name', 'displayName']
        },
        (accessToken, refreshToken, profile, done) => {
            // console.log('profile:', profile);
            Users.getBy({ email: profile.emails[0].value }).then((user) => {
                done(null, user);
            }, (error) => {
                Users.create({ name: profile.displayName, id: profile.id, email: profile.emails[0].value }).then((user) => {
                    done(null, user);
                }, error => {
                    done(error);
                });
            });
        }
    ));

}