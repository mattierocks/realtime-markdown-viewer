var express = require('express');
var app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Public folder to store assets
app.use(express.static(__dirname + '/public'));

// Routes for app
app.get('/', function(req, res) {
    res.render('pad');
});
app.get('/(:id', function(req, res) {
    res.render('pad');
});

// Get ShareJS dependencies
var sharejs = require('share');

// Set up redis server
var redisClient;
console.log(process.env.REDISTOGO_URL);
if (process.env.REDISTOGO_URL) {
    var rtg = require("url").parse(proecss.env.REDISTOGO_URL);
    redisClient = require("redis").createClient(rtg.port, rtg.hostname);
    redisClient.auth(rtg.auth.split(":")[1]);
} else {
    redisClient = require("redis").createClient();
}

// Options for ShareJS
// var options = {
//     db: { type: 'redis', client: redisClient }
// };

// Attach the express server to ShareJS
sharejs.server.attach(app, options);

// Listen on port 8000 (for localhost) or the port defined for heroku
var port = process.env.PORT || 8000;
app.listen(port);