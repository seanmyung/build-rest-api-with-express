var auth = require('basic-auth'); 
var User = require('../models/user'); 

function authorization(req, res, next) {
  var credentials = auth(req);

  if (!credentials || !credentials.name || !credentials.pass) {
    var err = new Error('You must be logged in to do this page.');
    err.status = 401;
    return next(err);
  }
  User.findOne({emailAddress: credentials.name})
  		.exec(function(error, user) {
  			if(error) {
  				return next(error);
  			} else if(!user) {
  				var err = new Error("Can't find user. Check your name and password again!");
  				err.status = 404; 
  				return next(err);
  			}
  		req.user = user;
  		return next();
  		});
}

module.exports.authorization = authorization;
