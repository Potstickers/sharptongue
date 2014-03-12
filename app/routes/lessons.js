'use strict';

var lessons = require('../controllers/lessons');
module.exports = function(app) {
  app.get('/lessons', lessons.lessons);
  app.get('/lesson/:id', lessons.lesson);
  app.get('/lesson/:id/entries', lessons.entries);
};