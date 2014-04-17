'use strict';
angular.module('sharptung.lessons').directive('ratingBox', function() {
  return {
    link: function(scope, elem, attrs) {
      console.log('in rating directive');
      var upThumb = angular.element(document.querySelector('#ratingBox span[class$="up"]'));
      var downThumb = angular.element(document.querySelector('#ratingBox span[class$="down"]'));
      var rate = function(rating, callback) {
        scope.rate(rating, callback);
      };
      scope.upvote = function() {
        if(!upThumb.hasClass('rated')) {
          rate({rating: true}, function() {
            console.log('upvoted');
            downThumb.removeClass('rated');
            upThumbs.addClass('rated');
          });
        }
      };
      scope.downvote = function() {
        if(!downThumb.hasClass('rated')) {
          rate({rating: false}, function() {
            console.log('upvoted');
            upThumb.removeClass('rated');
            downThumbs.addClass('rated');
          });
        }
      };
    }
  };
});