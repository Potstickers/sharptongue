'use strict';
angular.module('sharptung.lessons').directive('flashcard', function(){
  //usuage attach to 
  return {
    template: "<div class='fc-front'>"
                  +"<span><img src='{{img_url}}' /></span>"
                +"</div>"
                +"<div class='fc-back'>"
                  +"<span>{{translation}}</span>"
                  +"<button class='translateBtn' data-audio-src='{{speech_src}}'>"
                    +"<i class='microphone-ico' />"
                  +"</button>"
                +"</div>",
    link: function(scope, elem, attrs) {
      console.log(scope);
      //init state
      var lesson = scope.lesson;
      var num_cards = lesson.entries.length;
      var max_idx = num_cards - 1;

      //bindings
      elem.bind('click', flipCard);
      elem.children()[1].find('button').bind('click', playTranslation);
      angular.element(document.querySelector('LEFTBTN')).bind('click', prevCard);
      angular.element(document.querySelector('RIGHTBTN')).bind('click', nextCard);
      var cur_idx = 0;
      var prev_idx = null;
      var next_idx = (num_cards > 0)? 1 : null;
      
      function setScope() {
        scope.entry = lesson.entries[cur_idx];
      }

      function nextCard() {
        if(cur_idx < max_idx) {
          cur_idx++;
        }else{
          cur_idx = 0;
        }
        setScope();
      }

      function prevCard() {
        if(cur_idx > 0) {
          cur_idx--;
        }else{
          cur_idx = max_idx;
        } 
        setScope();
      }

      function flipCard() {
        elem.children()[0].toggleClass('VISIBLE'); //front
        elem.children()[1].toggleClass('VISIBLE'); //back
      }

      function playTranslation() {
        var speech = new Audio(lesson.entries[cur_idx].audioUrl); //cache this somewhere
        speech.play();
      }


    }
  };
});