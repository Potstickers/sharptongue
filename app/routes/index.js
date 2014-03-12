'use strict';

module.exports = function(app) {
    
    // Home route
    var index = require('../controllers/index');
    app.get('/', index.render);
    app.get('/lessons/flashcards', index.flashcards);
    //app.get('/translate/:text(.{1,})/to/:lang([a-z]{2})', index.api);
    app.get('/translate/:text/to/:lang', index.api);
};
