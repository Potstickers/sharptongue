'use strict';
angular.module('sharptung.lessons').directive('flashcard', [],function(){
  //reference: http://jsfiddle.net/eeuSv/
  //reference: http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
  return {
    link: function(scope, elem, attrs) {
      scope.$watch('fc', function(fc) {
        if(fc) {
          //init state
          var flashcard = angular.element(document.querySelector('#flashcard'));
          var num_cards = scope.fc.getLength();
          var max_idx = num_cards - 1;
          var cur_idx = 0;
          var prev_idx = null;
          var next_idx = (num_cards > 0)? 1 : null;
          
          var setScope = function() {
            scope.fc.setEntry(cur_idx);
            scope.$apply(function() {
              scope.img = scope.fc.curEntry.img;
              scope.translation = scope.fc.curEntry.translation;
              scope.speech = scope.fc.curEntry.speech;
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
            card.style.transform = "rotateX(180deg)";
            card.style["-webkit-transform"] = "rotateX(180deg)";
          };

          var playTranslation = function() {
            var speech = new Audio(scope.fc.curEntry.audio);
            speech.play();
          };
          
          //bindings
          flashcard.bind('click', flipCard);
          angular.element(document.querySelector('#audiobutton')).bind('click', playTranslation);
          angular.element(document.querySelector('td#back')).bind('click', prevCard);
          angular.element(document.querySelector('td#next')).bind('click', nextCard);
          
          //init
          setScope();
        }
      });
    }
  };
});