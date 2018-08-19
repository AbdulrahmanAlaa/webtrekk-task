const Customers = require('../models/customers.model');
const Users = require('../models/user.model');
const helpers = {};

//Function to populate data in DB if DB is empty.
helpers.populateDb = function () {
    // initalizing Customers mocking data
    const customers = Customers.get();
    customers.then((data) => {
        if (data.length) {
            console.log('Customers table already populated.');
        }
        else {
            console.log('Populating Customers table.');
            Customers.seed();
        }
    });
    
    // initalizing Users mocking data
    const users = Users.get();
    users.then((data) => {
        if (data.length) {
            console.log('Users table already populated.');
        }
        else {
            console.log('Populating Users table.');
            Users.seed();
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
