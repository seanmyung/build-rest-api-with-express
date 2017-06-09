'use strict'; 

var express = require('express'); 
var router = express.Router(); 
var User = require('../models/user'); 
var auth = require('../middleware'); 

// GET /api/users 200
router.get('/', auth.authorization, function(req, res) {
  res.status(200);
	return res.json(req.user); 
});

//POST /api/users 201
router.post('/', function(req, res, next){
	if (req.body.fullName &&
    req.body.emailAddress &&
    req.body.password) {

      // use schema's `create` method to insert document into Mongo
      User.create(req.body, function (error) {
        if (error) {
          return next(error);
        } else {
          //req.session.userId = user._id;
          res.location('/');
          res.status(201);
          return res.end();

        }
      });

    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
});

module.exports = router; 

