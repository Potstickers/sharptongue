'use strict';

var mongoose = require('mongoose');
var Lesson = mongoose.model('Lesson');

exports.lessons = function(req, res) {
  Lesson
    .find({})
    .select('fields')
    .exec(function(err, lessons) {
      var result = {};
      if(err) 
        result.err = err;
      else
        result = lessons;
      res.send(result);
    });
};
exports.lesson = function(req,res) {
  Lesson
    .findOne({id: req.params.id})
    .exec(function(err, lesson) {
      var result = {};
      if(err)
        result.err = err;
      else
        result = lesson;
      res.send(result);
    });
};
/**
  probably not needed. the preceding func will do and cache entries client side. 
*/
exports.entries = function(req, res) {
  Lesson
    .findOne({id: req.params.id})
    .select('entries')
    .exec(function(err, lesson) {
      var result = {};
      if(err)
        result.err = err;
      else
        result = lesson;
      res.send(result);
    });
};