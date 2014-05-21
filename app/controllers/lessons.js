'use strict';

var mongoose = require('mongoose');
var Lesson = mongoose.model('Lesson');
var API = require("./index");
var _ = require('lodash');
var ObjectId = mongoose.Types.ObjectId;

exports.lessons = function(req, res) {
  Lesson
    .find({}, "title user ratings.upvotes ratings.downvotes")
    .populate('user', 'name')
    .exec(function(err, lessons) {
      var result = {};
      if(err) 
        result.err = err;
      else
        result = lessons;
      res.send(result);
    });
};
var translateEntries = function(entries, lang, next) {
  API.translateNoClient(entries, lang, function(translatedEntries) {
    var result = {
      entries: translatedEntries
    };
    next(result);
  });
};
exports.lesson = function(req,res) {
  if(req.user) {
    Lesson
    .findOne({
      _id: req.params.lessonId,
      'ratings.votes.user': ObjectId(req.user.id),
    }, "entries ratings title",{'ratings.votes.$': 1}, function(err, lesson) {
      if(lesson) {
        translateEntries(lesson.entries, req.query.lang, function(translatedResult) {
          translatedResult.title = lesson.title;
          translatedResult.rating = lesson.ratings.votes[0].rating;
          return res.send(translatedResult);
        });
      }
    });
  } //case where non-authenticated user or user has not rated lesson yet
  Lesson.findById(req.params.lessonId, function(err, lesson) {
    translateEntries(lesson.entries, req.query.lang, function(translatedResult) {
      translatedResult.title = lesson.title;
      return res.send(translatedResult);
    });
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
    console.log(lesson.ratings);
    lesson.save(function(err, lesson){
      res.jsonp(err);
    });
  });
};
