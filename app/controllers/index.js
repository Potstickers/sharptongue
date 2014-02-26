'use strict';

var http = require("http");

exports.render = function(req, res) {
    res.render('index', {
        user: req.user ? JSON.stringify(req.user) : 'null'
    });
};

exports.api =  function(req, res) {
    
    function translate(lang, text) {
        return "/translate_a/t?client=t&sl=auto&tl=" + lang + "&hl=en&sc=2&ie=UTF-8&oe=UTF-8&uptl=" + lang + "&ssel=0&tsel=0&q=" + text;
    }
    
    function tts(lang, text) {
        return "/translate_tts?ie=UTF-8&q=" + text + "&tl=" + lang;
    }
    
    var text = req.params.text, lang = req.params.lang;
    res.setHeader("Content-Type", "text/json; charset=utf-8");
	
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
				tts : tts(lang, text),
				translate : translate(lang, text)
			};
			http.get({
				host: "translate.google.com",
				port: 80,
				path: tts(lang, body.pronunciation)
			}, function(socket){
        var all = new Buffer(0);
        socket.on("data", function(data) {
          all = Buffer.concat(all, data);
        });
        socket.on("end", function() {
          body.audio = "data:audio/mp3;base64," + all.toString("base64");
          res.send(body);
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