
const mongoose = require('mongoose');
const q = require('q');

/** defining schema for users table */
const customersSchema = new mongoose.Schema({
    customerID: {
        type: Number,
        required: true
    },
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    birthday: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    lastContact: {
        type: String,
        required: false
    },
    customerLifetimeValue: {
        type: Number,
        required: false
    },
    customerImage: {
        name: String, value: String
    }
});

/** Initlizing interface object of this model */
var customersModel = {};

/** Customers Collection Model Definition*/
const Customers = mongoose.model('customers', customersSchema);


/** Function to seed Customers data */
customersModel.seed = () => {
    const customers = require('../shared/configurations/customers');
    Customers.collection.insert(customers, function (err, customer) {
        if (err) {
            console.log('error occured in populating database');
        }
        else {
            console.log('Customers table populated.');
        }
    });
}

/** Get All videos from DB */
customersModel.get = () => {
    const results = q.defer();
    Customers.find((err, dbCustomers) => {
        if (err) {
            results.reject(err);
        }

        results.resolve(dbCustomers);
    });
    return results.promise;
}

/**
 * Get Single Customer
 * @param {number} id customer identifier 
 */
customersModel.getOne = (id) => {
    const results = q.defer();

    if (!id) {
        results.reject({ status: 'error', error: 'customer Id not supplied.' });
    }

    Customers.findOne({ customerID: id }, (err, dbCustomer) => {
        if (err) {
            results.reject(err);
        }

        if (dbCustomer) {
            results.resolve(dbCustomer);
        } else {
            results.reject({ status: 'error', error: 'Invalid Customer supplied.' });
        }

    });
    return results.promise;
}

/**
 * Add Customer To Customers Collection in DB
 * @param {Customer} customer 
 */
customersModel.create = (customer) => {
    const results = q.defer();

    if (!customer) {
        results.reject({ status: 'error', error: 'customer not supplied.' });
    }

    Customers.create(customer, (err, dbCustomer) => {
        if (err) {
            results.reject(err);
        }

        if (dbCustomer) {
            results.resolve(dbCustomer);
        } else {
            results.reject({ status: 'error', error: 'Invalid customer supplied.' });
        }

    });
    return results.promise;
}

/**
 * Remove Customer by ID
 * @param {number} customerId customer identifier 
 */
customersModel.remove = (customerId) => {
    const results = q.defer();
    Customers.find({ customerID: customerId }).remove((err, dbCustomer) => {
        if (err) {
            results.reject(err);
        }
        if (dbCustomer) {
            results.resolve(dbCustomer);
        } else {
            results.reject({ status: 'error', error: 'Invalid Customer supplied.' });
        }
    });
    return results.promise;
};

/**
 * Update Customer Data in DB
 * @param {Customer} body the Customer New Data 
 */
customersModel.update = (body) => {
    const results = q.defer();
    const customerID = body && body.customerID;
    if (!customerID) {
        results.reject({ status: 'error', error: 'customer Id not supplied.' });
    }
    Customers.findOneAndUpdate({ customerID }, body, { upsert: false }, (err, dbCustomer) => {
        if (err) {
            results.reject(err);
        }

        if (dbCustomer) {
            results.resolve(dbCustomer);
        } else {
            results.reject({ status: 'error', error: 'Invalid customer supplied.' });
        }
    });
    return results.promise;

}

// Customer Model 
customersModel.Customers = Customers;

module.exports = customersModel;