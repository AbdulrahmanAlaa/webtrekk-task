
const mongoose = require('mongoose');
const q = require('q');

/** defining schema for users table */
const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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
       console.log('in findOne...')
        if (err) {
            results.reject(err);
        }

        if (dbUser) {
            const user = dbUser.toObject();
            delete user.password;
            console.log('dbUser',dbUser);
            results.resolve(user);
        } else {
            results.reject({ status: 'error', error: 'Invalid User supplied.' });
        }

    });
    return results.promise;
}

// /**
//  * Add Customer To Users Collection in DB
//  * @param {Customer} customer 
//  */
// usersModel.create = (customer) => {
//     const results = q.defer();

//     if (!customer) {
//         results.reject({ status: 'error', error: 'customer not supplied.' });
//     }

//     Users.create(customer, (err, dbCustomer) => {
//         if (err) {
//             results.reject(err);
//         }

//         if (dbCustomer) {
//             results.resolve(dbCustomer);
//         } else {
//             results.reject({ status: 'error', error: 'Invalid customer supplied.' });
//         }

//     });
//     return results.promise;
// }

// /**
//  * Remove Customer by ID
//  * @param {number} customerId customer identifier 
//  */
// usersModel.remove = (customerId) => {
//     const results = q.defer();
//     Users.find({ customerID: customerId }).remove((err, dbCustomer) => {
//         if (err) {
//             results.reject(err);
//         }
//         if (dbCustomer) {
//             results.resolve(dbCustomer);
//         } else {
//             results.reject({ status: 'error', error: 'Invalid Customer supplied.' });
//         }
//     });
//     return results.promise;
// };

// /**
//  * Update Customer Data in DB
//  * @param {Customer} body the Customer New Data 
//  */
// usersModel.update = (body) => {
//     const results = q.defer();
//     const customerID = body && body.customerID;
//     if (!customerID) {
//         results.reject({ status: 'error', error: 'customer Id not supplied.' });
//     }
//     Users.findOneAndUpdate({ customerID }, body, { upsert: false }, (err, dbCustomer) => {
//         if (err) {
//             results.reject(err);
//         }

//         if (dbCustomer) {
//             results.resolve(dbCustomer);
//         } else {
//             results.reject({ status: 'error', error: 'Invalid customer supplied.' });
//         }
//     });
//     return results.promise;

// }

// Customer Model 
usersModel.Users = Users;

module.exports = usersModel;