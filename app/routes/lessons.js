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

//rating authorization helper
var hasRatingAuth = function(req, res, next) {
  lessons.userRatedLesson(req, res, function(hasRated) {
    if (hasRated) {
      return res.send(401, 'User is not authorized');
    }
    next();
  });
}
module.exports = function(app) {
  app.get('/lessons', lessons.lessons);
  app.get('/lessons/:lessonId', lessons.lesson);
  app.get('/lessons/ratings/:lessonId', authorization.requiresLogin, hasRatingAuth, lessons.rate);
  app.post('/lessons', authorization.requiresLogin, lessons.create);
  app.put('/lessons/:lessonId', authorization.requiresLogin, hasAuthorization, lessons.update);
  app.del('/lessons/:lessonId', authorization.requiresLogin, hasAuthorization, lessons.destroy);
};