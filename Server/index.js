//requiring NPM modeles
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const db = mongoose.connection;
const app = express();
const helper = require('./shared/helper');
const cors = require('cors');

// Load application Configurations 
const config = require('./configurations/environment');

// Allow Cross Origin Requests
app.use(cors());

// Register Auth Strategy 
require('./configurations/passport');

// To parse application/json header.
app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json({ limit: '5mb', extended: true }, ));


// Initialize Application APIs Routes
const allroutes = require('./routes');
app.use('/api', allroutes);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/../dist'));

// Log DataBase Error
db.on('error', console.error);

// Connect to mongolab DB
mongoose.connect(config.databaseUrl);

// Populating data if DB is not already populated.
helper.populateDb();

app.get('/*', function (req, res) {
    const pathName = (req.path.match(/customer/) || req.path === '/') ? 'index.html' : req.path;
    res.sendFile(path.join(__dirname + '/../dist/webtrekk-task/' + pathName));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);