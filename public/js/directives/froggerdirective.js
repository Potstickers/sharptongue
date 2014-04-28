'use strict';
angular.module('sharptung.lessons').directive('frogger', function(){
  //reference: http://jsfiddle.net/eeuSv/
  //reference: http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
  console.log('in frogger directive');
  return {
    link: function(scope, elem, attrs) {
      scope.$watch('fc', function(frog) {
        if(frog) {
          scope.fc.curEntry = {};
          //init state
          var entries;
          var num_cards;
          
          var populateLangOpts = document.querySelector('[populate-lang-opts]');
          
          //init
          var populateLangOptsChange = function(){
            scope.fc.initFlashcards(angular.element(populateLangOpts).val(), function(lesson) {
              entries = lesson.entries;
              num_cards = entries.length;
            });
          };
          populateLangOptsChange();
          angular.element(populateLangOpts).change(populateLangOptsChange);
        }
      });
    }
  };
});