const customers = require('../../controllers/customers.controller');
const routes = (app) => {
    // Customers Module routes
    app.get('/customers', customers.get);
    app.get('/customers/:customerID', customers.getOne);
    app.post('/customers', customers.create);
    app.delete('/customers/:customerID', customers.remove);
    app.put('/customers',customers.update)
}


module.exports = routes;