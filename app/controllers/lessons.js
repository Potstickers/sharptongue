'use strict';

var mongoose = require('mongoose');
var Lesson = mongoose.model('Lesson');
var API = require("./index");

exports.lessons = function(req, res) {
  Lesson
    .find({})
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
    .findById(req.params.lessonId)
    .exec(function(err, lesson) {
      var result = {};
      if(err)
        result.err = err;
      else
        result = lesson;
      if(req.query.isFc) {
        API.translateNoClient(result.entries, req.query.lang, function(result) {
          res.send({entries: result});
        });
      }else {
        res.send(result);
      }
    });
};

//  probably not needed. the preceding func will do and cache entries client side. 
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

exports.create = function(req, res) {

};

exports.update = function(req, res) {

};

exports.destroy = function(req, res) {

};
