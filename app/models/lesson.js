'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Word Schema (Dictionary)
 */
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
    }
});

/**
 * Validations
 */
LessonSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');



mongoose.model('Article', ArticleSchema);
