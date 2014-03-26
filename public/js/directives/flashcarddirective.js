'use strict';
angular.module('sharptung.lessons').directive('flashcard', function(){
  //reference: http://jsfiddle.net/eeuSv/
  //reference: http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
  return {
    link: function(scope, elem, attrs) {
      
      scope.$watch('lesson', function(lesson) {
        if(lesson) {
          //init state
          var lesson = scope.lesson;
          var num_cards = lesson.entries.length;
          var max_idx = num_cards - 1;
          var cur_idx = 0;
          var prev_idx = null;
          var next_idx = (num_cards > 0)? 1 : null;
          
          var setScope = function() {
            scope.$apply(function() {
              scope.img_src = lesson.entries[cur_idx].img;
              scope.translation = lesson.entries[cur_idx].translation;
              scope.speech_src = lesson.entries[cur_idx].speech_src;
            });
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
            var speech = new Audio(); //cache this somewhere
            speech.play();
          }
          
          //bindings
          elem.bind('click', flipCard);
          angular.element(elem.children()[1]).find('button').bind('click', playTranslation);
          angular.element(document.querySelector('LEFTBTN')).bind('click', prevCard);
          angular.element(document.querySelector('RIGHTBTN')).bind('click', nextCard);
          
          //init
          setScope();
        }
      });
    }
  };
});