'use strict';

var lessons = require('../controllers/lessons');

module.exports = function(app) {
    app.get('/lessons', lessons.lessons);
    app.get('/lessons/:lessonId', lessons.lesson);
    app.get('/lessons/:lessonId/entries', lessons.entries);
};