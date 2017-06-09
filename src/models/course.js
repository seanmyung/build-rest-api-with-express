'use strict';

var mongoose = require('mongoose');
var User = require('./user');
var Review = require('./review');

var CourseSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    estimatedTime: String,
    materialsNeeded: String,
    steps: [{
      stepNumber: Number,
      title: {
        type: String,
        retquire: [true, 'Steps title is required']
      } , 
      description: {
        type: String,
        require: [true, 'Steps dscription is required']
      }
    }], 
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }]
});

var Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
