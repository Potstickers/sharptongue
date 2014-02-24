'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	root: rootPath,
	port: process.env.PORT || 3000,
	db: process.env.MONGOHQ_URL,
	templateEngine: 'swig',

	// The secret should be set to a non-guessable string that
	// is used to compute a session hash
	sessionSecret: 'th1sIstotallyN0nG1_!e5a13|e:)um4dBraH?umad?yeaumad...',
	// Wow guys
	
	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'sessions'
};
