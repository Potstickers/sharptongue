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
    var fc = $scope.fc = {
      curEntry: {},
      initFlashcards: function() {
        Lessons.getTranslatedEntries({
          lessonId: $routeParams.lessonId
        }, function(lesson) {
          console.log(lesson);
          curLesson = lesson;
          fc.curEntry.img = curLesson.entries[0].img,
          fc.curEntry.translation = curLesson.entries[0].translation;
          fc.curEntry.audio = curLesson.entries[0].audio;
        });
      },
      getLength: function() {
        if(typeof curLesson === 'undefined')
          fc.initFlashcards();
        return curLesson.entries.length;
      },
      setEntry: function(entryIdx) {
        if(typeof curLesson === 'undefined')
         fc.initFlashcards();

        fc.curEntry.img = curLesson.entries[entryIdx].img;
        fc.curEntry.translation = curLesson.entries[entryIdx].translation;
        fc.curEntry.audio = curLesson.entries[entryIdx].audio;
      }
    }
  }]);