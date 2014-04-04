'use strict';

var http = require("http");

var translate = function(text, lang, callback) {
  function translate(lang, text) {
    return "/translate_a/t?client=t&tl=" + lang + "&hl=en&ie=UTF-8&oe=UTF-8&uptl=" + lang + "&q=" + text.replace(' ', '+');
  }
    
  function tts(lang, text) {
    return "/translate_tts?ie=UTF-8&q=" + text.replace(' ', '+') + "&tl=" + lang;
  }
  http.get({
    host: "translate.google.com",
    port: 80,
    path: translate(lang, text)
  }, function(socket){
    socket.on("data", function(chunk) {
      chunk += "";
      console.log(chunk);
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
          callback(body);
        });
      }).on("error", function(e){
        callback({
          error : "Invalid API call (2)."
        });
      });
    });
  }).on("error", function(e){
    callback({
      error : "Invalid API call (1)."
    });
  });
};

exports.render = function(req, res) {
    res.render('index', {
        user: req.user ? JSON.stringify(req.user) : 'null'
    });
};

exports.savescore = function(req, res) {
  //save score
};
exports.getscore = function(req, res) {
  //get score
};
exports.api = function(req, res) {
  var text = req.params.text, lang = req.params.lang;
  translate(text, lang, function(result) {
    if(result.error) {
      res.send(result);
    } else {
      res.json(result);
    }
  });
};

exports.translateNoClient = function(entries, lang, callback) {
  var count = 0;
  var copy = [];

  for(var i = 0; i < entries.length; i++) {
    (function() {
      var j = i;
      translate(entries[j].entry, lang, function(result) {
        count++;
        copy[j] = {};
        copy[j].img = entries[j].img;
        copy[j].audio = result.audio;
        copy[j].translation = result.output;
        console.log(copy[j]);
        if(count >= entries.length) {
          callback(copy);
        }
      });
    }());
  }
};