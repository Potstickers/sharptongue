'use strict';

angular.module('sharptung.lessons').controller('LessonsController', 
  ['$scope', '$routeParams', '$location', 'Global', 'Lessons',
  function ($scope, $routeParams, $location, Global, Lessons) {
    $scope.global = Global;

    var curLesson;

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

    //init for flashcards, not the ng way
    $scope.fc = {
      curEntry: {},
      initFlashcards: function(callback) {
        Lessons.getTranslatedEntries({
          lessonId: $routeParams.lessonId
        }, function(lesson) {
          curLesson = lesson;
          if(callback)
            callback(lesson);
        });
      }
    };
  }]);