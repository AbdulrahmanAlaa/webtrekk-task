const Customers = require('../models/customers.model');
const helpers = {};

//Function to populate data in DB if DB is empty.
helpers.populateDb = function () {
    const promise = Customers.get();
    promise.then((data) => {
        if (data.length) {
            console.log('Customers table already populated.');
        }
        else {
            console.log('Populating Customers table.');
            Customers.seed();
        }
    });
}

helpers.createResponse = (data)=>{
    const response = {};
    response.status = 'success';
    response.data = data;
    return response;
}
module.exports = helpers;
