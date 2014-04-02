'use strict';
angular.module('sharptung.lessons').directive('flashcard', function(){
  //reference: http://jsfiddle.net/eeuSv/
  //reference: http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
  console.log('in flashcard directive');
  return {
    link: function(scope, elem, attrs) {
      scope.$watch('fc', function(fc) {
        if(fc) {
          //init state
          var num_cards;
          var max_idx;
          scope.fc.getLength(function(length){
            num_cards = length;
            max_idx = num_cards - 1;
          });
          var cur_idx = 0;
          var prev_idx = null;
          var next_idx = 1;
          
          var setScope = function() {
            scope.fc.setEntry(cur_idx);
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
          angular.element(document.querySelector('#flashcard')).click(flipCard);
          angular.element(document.querySelector('#audiobutton')).click( playTranslation);
          angular.element(document.querySelector('td#back')).click( prevCard);
          angular.element(document.querySelector('td#next')).click(nextCard);
          
          //init
          setScope();
        }
      });
    }
  };
});