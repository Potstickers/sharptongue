'use strict';

var http = require("http");

exports.render = function(req, res) {
    res.render('index', {
        user: req.user ? JSON.stringify(req.user) : 'null'
    });
};
/*
See comment in routes/index.js.
Res.render renders a new page and sends it back. Doc:(http://expressjs.com/api.html#res.render)
Use res.send to json back

exports.lessons = function (req, res) {
    res.render('lessons');
};

exports.flashcards = function (req, res) {
    res.render('lessons/flashcards');
};

exports.quizzes = function (req, res) {
    res.render('lessons/quizzes');
};

exports.create = function (req, res) {
    res.render('create');
};

exports.settings = function (req, res) {
    res.render('settings');
};
*/
exports.savescore = function(req, res) {
  //save score
};
exports.getscore = function(req, res) {
  //get score
};
exports.api = function(req, res) {
    
    function translate(lang, text) {
        return "/translate_a/t?client=t&tl=" + lang + "&hl=en&ie=UTF-8&oe=UTF-8&uptl=" + lang + "&q=" + text.replace(' ', '+');
    }
    
    function tts(lang, text) {
        return "/translate_tts?ie=UTF-8&q=" + text.replace(' ', '+') + "&tl=" + lang;
    }
    
    var text = req.params.text, lang = req.params.lang;
    //res.setHeader("Content-Type", "text/json; charset=utf-8");
	
	http.get({
		host: "translate.google.com",
		port: 80,
		path: translate(lang, text)
	}, function(socket){
		socket.on("data", function(chunk) {
			chunk += "";
			chunk = JSON.parse(chunk.substring(2, chunk.indexOf("]") + 1));
			var body = {
				output : chunk[0],
				input : chunk[1],
				pronunciation : chunk[2] || chunk[0],
				tts : tts(lang, chunk[2] || chunk[0]),
				translate : translate(lang, text)
			};
			http.get({
				host: "translate.google.com",
				port: 80,
				path: tts(lang, body.pronunciation)
			}, function(socket){
        var all = new Buffer(0);
        socket.on("data", function(data) {
          all = Buffer.concat([all, data]);
        });
        socket.on("end", function() {
          body.audio = "data:audio/mp3;base64," + all.toString("base64");
          res.json(body);
        });
			}).on("error", function(e){
				res.send({
					error : "Invalid API call (2)."
				});
			});
		});
	}).on("error", function(e){
		res.send({
			error : "Invalid API call (1)."
		});
	});
};