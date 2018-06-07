const customerModel = require('../models/customers.model');
const helpers = require('../shared/helper');
const customerCtrl = {};

const errorHandler = (err) => {
    res.status(400);
    res.send(err);
}

customerCtrl.get = (req, res) => {
    customerModel.get().then((data) => {
        res.send(helpers.createResponse(data));
    }, errorHandler);
};

customerCtrl.getOne = (req, res) => {
    const customerId = req.params.customerID;
    customerModel.getOne(customerId).then((data) => {
        res.send(helpers.createResponse(data));
    }, errorHandler);
};

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
        }, errorHandler);
    } else {
        res.status(400);
        res.send(filtered);
    }
}


customerCtrl.remove = (req, res) => {
    const customerId = req.params.customerID;
    customerModel.remove(customerId).then((data) => {
        res.send(helpers.createResponse(data));
    }, errorHandler);
}

customerCtrl.update = (req, res) => {
    customerModel.update(req.body).then((data) => {
        res.send(helpers.createResponse(data));
    }, errorHandler);

}



module.exports = customerCtrl;
