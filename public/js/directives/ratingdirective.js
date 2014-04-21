'use strict';
angular.module('sharptung.lessons').directive('ratingBox', function() {
  return {
    link: function(scope, elem, attrs) {
      console.log('in rating directive');
      var thumbs = document.querySelector('#ratingBox');
      var upThumb = angular.element(thumbs.children[0]);
      var downThumb = angular.element(thumbs.children[1]);

      var rate = function(rating, callback) {
        scope.rate(rating, callback);
      };
      var toggleThumbs = function(op, upthumb, downthumb) {
        if(op === "up") {
          if(downthumb) {
            downthumb.removeClass('rated');
            upthumb.addClass('rated');
          } else {
            upthumb.removeClass('rated');
          }
        } else {
          if(upthumb) {
            upthumb.removeClass('rated');
            downthumb.addClass('rated');
          } else {
            downthumb.removeClass('rated');
          }
        }
      }
      scope.upvote = function() {
        var rating = {rating: true};
        if(!upThumb.hasClass('rated')) {
          rate(rating, function(res) {
            toggleThumbs("up", upThumb, downThumb);
          });
        } else {
          rate(rating, function(res) {
            toggleThumbs("up", upThumb);
          });
        }
      };
      scope.downvote = function() {
        var rating = {rating: false};
        if(!downThumb.hasClass('rated')) {
          rate(rating, function(res) {
            toggleThumbs("down", upThumb, downThumb);
          });
        } else {
          rate(rating, function(res) {
            toggleThumbs("down", null, downThumb);
          });
        }
      };
    }
  };
});