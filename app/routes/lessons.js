'use strict';

var lessons = require('../controllers/lessons');
var authorization = require('./middlewares/authorization');

// Lesson authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.lesson.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {
    app.get('/lessons', lessons.lessons);
    app.post('/lessons', authorization.requiresLogin, lessons.create);
    app.get('/lessons/:lessonId', lessons.lesson);
    app.get('/lessons/:lessonId/entries', lessons.entries);
    app.put('/lessons/:lessonId', authorization.requiresLogin, hasAuthorization, lessons.update);
    app.del('/lessons/:lessonId', authorization.requiresLogin, hasAuthorization, lessons.destroy);
};