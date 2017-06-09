'use strict';

// load modules
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose');
var seeder = require('mongoose-seeder'); 
var data = require('./data/data.json');

var app = express();
var user = require('./routes/user');
var course = require('./routes/course');

//mongodb connection 
mongoose.connect("mongodb://localhost:27017/review_courses");
var db = mongoose.connection;
//mongo error 
db.on('error', console.error.bind(console, 'connection error:'));
//mongo  connection successful 
db.once("open", function() {
	console.log("db connection successful");
	seeder.seed(data).then(function(dbData) {
		console.log("Data created in database");
	}).catch(function(error) {
		console.log('Error found. ' + error);
	});
});

// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));
// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// setup our static route to serve files from the "public" folder
app.use('/', express.static('public'));

//include routes 
app.use('/api/users', user);
app.use('/api/courses', course);


// catch 404 and forward to global error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express's global error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({"message": err.message});
});

// start listening on our port
var server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});
