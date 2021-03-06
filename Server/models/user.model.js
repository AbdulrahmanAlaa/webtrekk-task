
const mongoose = require('mongoose');
const q = require('q');
const validationHelper = require('../shared/helpers/validation.helper');

/** defining schema for users table */
const usersSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false,
        minlength: [8, validationHelper.minLength('password', 8)],
        maxlength: [38, validationHelper.maxLength('password', 38)]
    }
});

/** Initlizing interface object of this model */
var usersModel = {};

/** Users Collection Model Definition*/
const Users = mongoose.model('users', usersSchema);


/** Function to seed Users data */
usersModel.seed = () => {
    const users = require('../shared/configurations/users');
    Users.collection.insert(users, function (err, users) {
        if (err) {
            console.log('error occurred in populating database');
        }
        else {
            console.log('Users table populated.');
        }
    });
}

/** Get All videos from DB */
usersModel.get = () => {
    const results = q.defer();
    Users.find((err, dbUsers) => {
        if (err) {
            results.reject(err);
        }
        results.resolve(dbUsers);
    });
    return results.promise;
}

/**
 * Get Single Customer
 * @param {number} id customer identifier 
 */
usersModel.getOne = (email, password) => {
    const results = q.defer();

    if (!email || !password) {
        results.reject({ status: 'error', error: 'email Or password not provided.' });
    }

    Users.findOne({ email, password }, (err, dbUser) => {
        if (err) {
            results.reject(err);
        }

        if (dbUser) {
            const user = dbUser.toObject();
            delete user.password;
            results.resolve(user);
        } else {
            results.reject({ status: 'error', error: 'Invalid User supplied.' });
        }

    });
    return results.promise;
}

/**
 * Get Single Customer
 * @param {number} id customer identifier 
 */
usersModel.getBy = (query) => {
    const results = q.defer();
    Users.findOne(query, (err, dbUser) => {
        if (err) {
            results.reject(err);
        }

        if (dbUser) {
            const user = dbUser.toObject();
            delete user.password;
            results.resolve(user);
        } else {
            results.reject({ status: 'error', error: 'Invalid User supplied.' });
        }

    });
    return results.promise;
}

/**
 * Add User To Users Collection in DB
 * @param {User} user 
 */
usersModel.create = (user) => {
    const results = q.defer();

    if (!user) {
        results.reject({ status: 'error', error: 'invalid user supplied' });
    }
    Users.create(user, (err, dbUser) => {
        if (err) {
            results.reject(err);
        }

        if (dbUser) {
            results.resolve(dbUser);
        } else {
            results.reject({ status: 'error', error: 'Invalid customer supplied.' });
        }

    });
    return results.promise;
}


// Customer Model 
usersModel.Users = Users;

module.exports = usersModel;