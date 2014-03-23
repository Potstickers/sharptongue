'use strict';
angular.module('sharptung.lessons').directive('initFlashcards', function(){
  console.log('in flashcard directive');
  //view this singleton that tracks flashcards state
  //eg: current card, prev card, next card, flipped, un flipped, etc.
  return {
    templateUrl: '/views/lessons/flashcards.html',
    link: function(scope, elem, attrs) {
      //things in this area
      //vars for tracking state, initialize state
      var cur_idx = 0;
      var next_idx = 1;
      var prev_idx = 999; //init in initailization function elsewhere
      
      //elem will be the container for the returned html; ng will plug it.
      //some accessory functions for keeping track of state and attached to cards, next(), prev()
      //change scope values to reflect in template
      //maybe something like:
      /* the scope object
        {
          entries: [the words],
          imgs: [the img urls],
          translateUrl: [bunch of preconstructed google api calls for each card]
          
        }
      */
    }
  };
});