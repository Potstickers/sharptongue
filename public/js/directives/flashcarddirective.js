'use strict';
angular.module('sharptung.lessons').directive('flashcard', function(){
  //reference: http://jsfiddle.net/eeuSv/
  return {
    template: "<div class='fc-front'>"
                  +"<span><img src='{{img_src}}' /></span>"
                +"</div>"
                +"<div class='fc-back'>"
                  +"<span>{{translation}}</span>"
                  +"<button class='translateBtn' data-audio-src='{{speech_src}}'>"
                    +"<i class='microphone-ico' />"
                  +"</button>"
                +"</div>",
    link: function(scope, elem, attrs, LessonsCtrl) {
      scope.$watch('lesson', function(lesson) {
        if(lesson) {
          console.log(lesson);

          var setScope = function() {
            scope.img_src = lesson.entries[cur_idx].img;
            scope.translation = lesson.entries[cur_idx].translation;
            scope.speec_src = lesson.entries[cur_idx].speech_src;
          };

          var nextCard = function() {
            if(cur_idx < max_idx) {
              cur_idx++;
            }else{
              cur_idx = 0;
            }
            setScope();
          };

          var prevCard = function() {
            if(cur_idx > 0) {
              cur_idx--;
            }else{
              cur_idx = max_idx;
            } 
            setScope();
          };

          var flipCard = function() {
            angular.element(elem.children()[0]).toggleClass('VISIBLE'); //front
            angular.element(elem.children()[1]).toggleClass('VISIBLE'); //back
          }

          var playTranslation = function() {
            var speech = new Audio(lesson.entries[cur_idx].audioUrl); //cache this somewhere
            speech.play();
          }
          //init state
          var lesson = scope.lesson;
          var num_cards = lesson.entries.length;
          var max_idx = num_cards - 1;

          //bindings
          elem.bind('click', flipCard);
          angular.element(elem.children()[1]).find('button').bind('click', playTranslation);
          angular.element(document.querySelector('LEFTBTN')).bind('click', prevCard);
          angular.element(document.querySelector('RIGHTBTN')).bind('click', nextCard);
          var cur_idx = 0;
          var prev_idx = null;
          var next_idx = (num_cards > 0)? 1 : null;
        }
      });
    }
  };
});