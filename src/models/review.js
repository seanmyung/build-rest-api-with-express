'use strict';

var mongoose = require('mongoose');
var User = require('./user');

var ReviewSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    postedOn: {
      type: Date,
      default: Date.now
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String
});

var Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
