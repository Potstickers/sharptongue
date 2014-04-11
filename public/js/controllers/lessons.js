'use strict';

angular.module('sharptung.lessons').controller('LessonsController', 
  ['$scope', '$routeParams', '$location', 'Global', 'Lessons',
  function ($scope, $routeParams, $location, Global, Lessons) {
    $scope.global = Global;

    $scope.find = function() {
      Lessons.query(function(lessons) {
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
      initFlashcards: function(callback) {
        Lessons.getTranslatedEntries({
          lessonId: $routeParams.lessonId
        }, function(lesson) {
          if(callback)
            callback(lesson);
        });
      }
    };
  }]);