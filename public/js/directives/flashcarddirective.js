'use strict';
angular.module('sharptung.lessons').directive('flashcard', function(){
  //reference: http://jsfiddle.net/eeuSv/
  //reference: http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
  console.log('in flashcard directive');
  return {
    link: function(scope, elem, attrs) {
      scope.$watch('fc', function(fc) {
        if(fc) {
          scope.fc.curEntry = {};
          //init state
          var entries;
          var num_cards;
          var max_idx;
          var cur_idx = 0;
          var prev_idx = null;
          var next_idx = 1;
          
          var flashcard = angular.element(document.querySelector('#flashcard'));
          var applyScope = function() {
            scope.$apply(function() {
              scope.fc.curEntry.img = entries[cur_idx].img;
              scope.fc.curEntry.translation = entries[cur_idx].translation;
            });
          };
          var setScope = function() {
            if(flashcard.hasClass('flipped')) {
              flashcard.removeClass('flipped');
              flashcard.on('transitionEnd webkitTransitionEnd', function() {
                applyScope();
              });
            }else{
              applyScope();
            }
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
            flashcard.toggleClass('flipped');
          };

          var playTranslation = function($event) {
            $event.stopPropagation();
            var speech = new Audio(entries[cur_idx].audio);
            speech.play();
          };
          
          //bindings
          flashcard.click(flipCard);
          // angular.element(document.querySelector
          angular.element(document.querySelector('#playTranslation')).click(playTranslation);
          angular.element(document.querySelector('td#back')).click(prevCard);
          angular.element(document.querySelector('td#next')).click(nextCard);
          
          //init
          scope.fc.initFlashcards(function(lesson) {
            entries = lesson.entries;
            num_cards = entries.length;
            max_idx = num_cards - 1;
            scope.fc.curEntry.img = entries[cur_idx].img;
            scope.fc.curEntry.translation = entries[cur_idx].translation;
          });
        }
      });
    }
  };
});