//requiring NPM modeles
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const db = mongoose.connection;
const app = express();
const helper = require('./shared/helper');

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json.
app.use(bodyParser.json());



// Intilaize Application APIs routes
const allroutes = require('./routes');
app.use('/api',allroutes);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/../dist'));

// Log DataBase Error
db.on('error', console.error);




// Connnect to mongolab DB
mongoose.connect('mongodb://admin:admin123@ds147180.mlab.com:47180/webtrekk');

// Populating data if DB is not already populated.
helper.populateDb();

app.get('/*', function (req, res) {
    const pathName = (req.path.match(/customer/) || req.path === '/')? 'index.html':req.path;
    res.sendFile(path.join(__dirname + '/../dist/webtrekk-task/' + pathName));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);