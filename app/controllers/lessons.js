'use strict';

var mongoose = require('mongoose');
var Lesson = mongoose.model('Lesson');
var API = require("./index");
var _ = require('lodash');
var ObjectId = mongoose.Types.ObjectId;

exports.lessons = function(req, res) {
  Lesson
    .find({}, "title user ratings")
    .populate('user', 'name')
    .exec(function(err, lessons) {
      console.log(lessons);
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
var userRatedLesson = function(req, res, next) {
  Lesson.findOne({
    _id: req.params.lessonId,
    'ratings.votes.user': ObjectId(req.user.id)
  }, {'ratings.votes.$': 1}, function(err, lesson) {
    Lesson.findById(req.params.lessonId, function(err, fullLesson) {
      if(lesson) {
        next(true, fullLesson, lesson.ratings.votes[0]);
      } else {
        next(false, fullLesson);
      }
    });
  });
};
exports.rate = function (req, res) {
  userRatedLesson(req,res, function(hasRated, lesson, rating) {
    console.log(rating);
    if(hasRated) {
      if (req.body.rating === rating.rating) {
        //undo rating
        lesson.ratings.votes.pull(rating);
        rating.rating ? lesson.ratings.upvotes-- : lesson.ratings.downvotes--;
      } else {
        //update rating
        lesson.ratings.votes.pull(rating).push({
          _id: rating._id,
          user: ObjectId(req.user.id), 
          rating: req.body.rating
        });
        rating.rating ? (
          lesson.ratings.upvotes--,
          lesson.ratings.downvotes++
        ) : (
          lesson.ratings.downvotes--,
          lesson.ratings.upvotes++
        );
      }
    } else {
      //not rated yet, just put
      lesson.ratings.votes.push({
        user: ObjectId(req.user.id), 
        rating: req.body.rating
      });
      req.body.rating ? lesson.ratings.upvotes++ : lesson.ratings.downvotes++;
    }
    lesson.save(function(err, lesson){
      console.log(lesson);
      res.jsonp(err);
    });
  });
};
