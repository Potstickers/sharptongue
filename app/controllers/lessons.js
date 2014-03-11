'use strict';

var mongoose = require('mongoose');
var Lesson = mongoose.model('Lesson');
/*
  Get all lessons
*/
exports.lessons = function(req, res) {
  Lesson
    .find({})
    .exec(function(err, lessons) {
      
    });
};
  