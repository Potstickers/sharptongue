'use strict';

module.exports = function(app) {
    
    // Home route
    var index = require('../controllers/index');
    app.get('/', index.render);
    app.get('/lessons', index.lessons);
    app.get('/lessons/flashcards', index.flashcards);
    app.get('/lessons/quizzes', index.quizzes);/*
    app.get('/create', index.create);
    app.get('/settings', index.settings);*/
    //app.get('/translate/:text(.{1,})/to/:lang([a-z]{2})', index.api);
    app.get('/translate/:text/to/:lang', index.api);
};
