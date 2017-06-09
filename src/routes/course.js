'use strict'; 

var express = require('express'); 
var router = express.Router(); 
var Course = require('../models/course'); 
var User = require('../models/user');
var Review = require('../models/review');
var auth = require('../middleware'); 
//var mid = require('../middleware'); 

// GET /api/courses 200
router.get('/', function(req, res) {
  Course.find({}, '_id title')
        .exec(function(error, courses){
          if(error) {
            return next(error);
          } else {
            res.status(200);
            return res.json(courses);
          }
        });
});

// GET /api/courses/:courseId 200
router.get('/:courseId', function(req, res) {
  Course.findById(req.params.courseId)
        .populate('user')
        .populate({
          path: 'reviews',
          model: 'Review',
          populate: {
            path: 'user',
            model: 'User'
          }
        })
        .exec(function(error, course){
          if(error) {
            return next(error);
          } else {
            res.status(200);
            return res.json(course);
          }
        });
});

//POST  /api/courses 201
router.post('/', auth.authorization, function(req, res, next){
  Course.create(req.body, function(error){
    if(error) {
      return next(error);
    } else {
      res.location('/');
      res.status(201);
      return res.end();
    }
  });
});

//PUT  /api/courses/:courseId 204
router.put('/:courseId', auth.authorization, function(req, res, next){
  Course.findByIdAndUpdate(req.params.courseId, {$set: req.body}, function(error){
    if(error) {
      return next(error);
    } else {
      if(req.body)
      res.status(204);
      return res.end();
    }
  });
});

//POST  /api/courses/:courseId/reviews 201
router.post('/:courseId/reviews', auth.authorization, function(req, res, next){
  Course.findById(req.params.courseId)
        .populate('user') 
        .populate({
          path: 'reviews',
          model: 'Review',
          populate: {
            path: 'user',
            model: 'User'
          }
        })
        .exec(function(error, course){
          if(error) {
            return next(error);
          } else {
            if(req.user._id !== course.user._id) {
              Review.create(req.body, function(error, review){
                if(error) {
                  return next(error);
                } else {
                  course.reviews.push(review._id);
                  course.save(function(error){
                    if(error) {
                      return next(error);
                    }
                    res.status(201);
                    return res.end();
                  });
                }
              });
            } else {
              var err = new Error("Error! Don't allow review your own course");
              err.status = 400; 
              return next(err);
            }
          }
        });
});

module.exports = router; 

