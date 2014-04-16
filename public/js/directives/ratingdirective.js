'use strict';
angular.module('sharptung.lessons').directive('ratingBox', function() {
  return {
    link: function(scope, elem, attrs) {
      var rate = function(rating, callback) {
        scope.rate(rating, callback);
      };
      scope.upvote = function() {
        rate({rating: true}, function() {
          console.log('upvoted');
          //toggle thumb ups color and prevent further action
        });
      };
      scope.downvote = function() {
        rate({rating: false}, function() {
          console.log('upvoted');
          //toggle thumb ups color and prevent further action
        });
      };
    }
  };
});