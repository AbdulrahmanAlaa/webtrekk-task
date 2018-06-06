//fetching all routes files.
const customersRoutes = require('./customers');

const routes = function(app){
	//Initilizing routes for each module
	customersRoutes(app);
}

module.exports = routes;