'use strict';

angular.module('sharptung.lessons').controller('LessonsController', 
  ['$scope', '$routeParams', '$location', 'Global', 'Lessons', 'Ratings',
  function ($scope, $routeParams, $location, Global, Lessons, Ratings) {
    $scope.global = Global;
    $scope.find = function() {
      Lessons.query(function(lessons) {
        console.log(lessons)
        $scope.lessons = lessons;
      });
    };
    
    $scope.findOne = function(callback) {
      Lessons.get({
        lessonId: $routeParams.lessonId
      }, function(lesson) {
        if(callback) {
          callback(lesson);
        } else {
          $scope.lesson = lesson;
        }
      });
    };
    $scope.create = function(lesson, callback) {
      var lesson = new Lessons(lesson);
      console.log(lesson);
      lesson.$save(function(response) {
        $location.path('lessons/' + response._id);
        callback();
      });
    };
    //init for flashcards, not the ng way
    $scope.fc = {
      initFlashcards: function(lang, callback) {
        Lessons.getTranslatedEntries({
          lessonId: $routeParams.lessonId, 
          lang: lang
        }, function(lesson) {
          console.log(lesson);
          $scope.fc.title = lesson.title;
          if(typeof lesson.rating !== 'undefined') {
            $scope.fc.rating = lesson.rating;
          }
          if(callback)
            callback(lesson);
        });
      }
    };
    $scope.rate = function(rating, callback) {
      Ratings.rate({
        rating: rating, 
        lessonId: $routeParams.lessonId
      }, function(res) {
        callback(res);
      });
    };
}]);