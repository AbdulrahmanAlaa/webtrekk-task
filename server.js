//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));


app.get('/*', function (req, res) {
    let pathName = (req.path.match(/customer/) || req.path === '/')? 'index.html':req.path;
    console.log(pathName)
    res.sendFile(path.join(__dirname + '/dist/webtrekk-task/' + pathName));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);