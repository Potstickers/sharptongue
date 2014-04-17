'use strict';

var mongoose = require('mongoose');
var Lesson = mongoose.model('Lesson');
var API = require("./index");
var _ = require('lodash');

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
          res.send({title: lesson.title, entries: result});
        });
      }else {
        res.send(result);
      }
    });
};

exports.create = function(req, res) {
  var lesson = new Lesson(req.body);
  lesson.user = req.user;
  lesson.save(function(err) {
    if(err) {
      res.send('error');
    }else {
      res.jsonp(lesson);
    }
  });
};

exports.update = function(req, res) {
  var lesson = req.lesson;
  lesson = _.extend(lesson, req.body);
  lesson.save(function(err) {
    if(err) {
      res.send('error');
    } else {
      res.jsonp(lesson);
    }
  });
};

exports.destroy = function(req, res) {
  var lesson = req.lesson;
  lesson.remove(function(err) {
    if(err) {
      res.send('error');
    } else {
      res.jsonp(lesson);
    }
  });
};
//checks if user has rated a given lesson
exports.userRatedLesson = function(req, res, next) {
  //user making the rating
  var userId = req.user.id;
  Lesson.findOne({'ratings.user': userId}, function(err, obj) {
    console.log('user rated lesson: ');
    console.log(obj);
    if (err)
      next(false);
    else
      next(true);
  });
};
exports.rate = function (req, res) {
  var lesson = req.lesson;
  console.log(lesson);
  console.log(req.body);
  lesson.save(function(err) {
    if(err) {
      res.send('error');
    } else {
      res.jsonp(lesson);
    }
  });
};
