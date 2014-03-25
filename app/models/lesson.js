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

var Lesson = mongoose.model('Lesson', LessonSchema);
Lesson.create({
  title: "How to invalidate all arguments",
  entries: [
    {entry: "Do you even lift?", img:"lift?.jpg"},
    {entry: "*Opposer looks in the mirror and realizes he doesn't lift.*", img:"selfreflect.jpg"},
    {entry: "Opposer proclaims yes anyway.", img:"straightfacelier.png"},
    {entry: "No you don't. No bicep peaks, quadricep? more like monocep... nvm thats just all fascia, here press this gallon o milk. *throws milk*", img:"litmustest.png"},
    {entry: "Opposer catches milk and proceeds to press on it with index finger*", img:"doesntevenlift.png"},
    {entry: "Done. *peace out*", img:"andalegendwasborned.png"}
  ]
}, function(err, lesson) {
  console.log('Yay!');
});