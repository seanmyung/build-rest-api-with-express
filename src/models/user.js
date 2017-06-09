'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var validator = require('validator');

var UserSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: [true, 'Name is require']
    },
    emailAddress: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    }
});
// authenticate input against database documents
UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({emailAddress: email})
      .exec(function (error, user) {
        if (error) {
          return callback(error);
        } else if ( !user ) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password , function(error, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
}

//Eamil validator 
UserSchema.path('emailAddress').validate(function(val) {
  return validator.isEmail(val);
}, 'Invalid Email'); 

// hash password before saving to database
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
