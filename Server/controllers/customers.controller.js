const customerModel = require('../models/customers.model');
const helpers = require('../shared/helper');
const customerCtrl = {};

/**
 * Handle any error accures during any MongoDB Operations   
 * @param {Object} err  Error Object From mongoose That holds error informations
 */
const errorHandler = (err,res) => {
    res.status(400);
    res.send(err);
}

/**
 * Get All Customers from MongoDB
 * @param {Request} req contains Request informations
 * @param {Response} res contains Response informations
 */
customerCtrl.get = (req, res) => {
    customerModel.get().then((data) => {
        res.send(helpers.createResponse(data));
    }, (error)=>errorHandler(error,res));
};

/**
 * Get Single Customer from MongoDB
 * @param {Request} req contains Request informations
 * @param {Response} res contains Response informations
 */
customerCtrl.getOne = (req, res) => {
    const customerId = req.params.customerID;
    customerModel.getOne(customerId).then((data) => {
        res.send(helpers.createResponse(data));
    }, (error)=>errorHandler(error,res));
};

/**
 * Add Single Customer to MongoDB after validating it
 * @param {Request} req contains Request informations
 * @param {Response} res contains Response informations
 */
customerCtrl.create = (req, res) => {
    reqCustomer = req.body || {};
    reqCustomer.customerID = +new Date();
    const customer = new customerModel.Customers(reqCustomer);
    const errors = customer.validateSync() || {};
    const filtered = Object.keys(errors.errors || {}).map((key) => {
        return errors.errors[key] && errors.errors[key].message;
    });
    if (!filtered.length) {
        customerModel.create(customer).then((data) => {
            res.send(helpers.createResponse(data));
        }, (error)=>errorHandler(error,res));
    } else {
        res.status(400);
        res.send(filtered);
    }
}

/**
 * Remove Customer from MongoDB by it's Id
 * @param {Request} req contains Request informations
 * @param {Response} res contains Response informations
 */
customerCtrl.remove = (req, res) => {
    const customerId = req.params.customerID;
    customerModel.remove(customerId).then((data) => {
        res.send(helpers.createResponse(data));
    }, (error)=>errorHandler(error,res));
}

/**
 * Update Single Customer in MongoDB
 * @param {Request} req contains Request informations
 * @param {Response} res contains Response informations
 */
customerCtrl.update = (req, res) => {
    customerModel.update(req.body).then((data) => {
        res.send(helpers.createResponse(data));
    }, (error)=>errorHandler(error,res));
}

module.exports = customerCtrl;
