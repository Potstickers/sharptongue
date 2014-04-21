'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RatingSchema = new Schema({
  rating: Boolean,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});
var LessonSchema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    entries: [{
      entry: String,
      img: String
    }],
    title: {
      type: String,
      required: true
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    ratings: {
      upvotes: {type: Number, default: 0},
      downvotes: {type: Number, default: 0},
      votes: [RatingSchema]
    }
});

/**
 * Validations
 */
LessonSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

mongoose.model('Lesson', LessonSchema);
