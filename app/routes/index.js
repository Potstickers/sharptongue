'use strict';

module.exports = function(app) {
    
    // Home route
    var index = require('../controllers/index');
    app.get('/', index.render);
    app.post('/score/:game_id/save', index.savescore);
    app.get('/score/:game_id/get', index.getscore);
    app.get('/translate/:text/to/:lang', index.api);
};
