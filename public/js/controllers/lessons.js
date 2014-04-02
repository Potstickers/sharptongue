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

    var fc = $scope.fc = {
      curEntry: {},
      initFlashcards: function(callback) {
        Lessons.getTranslatedEntries({
          lessonId: $routeParams.lessonId
        }, function(lesson) {
          curLesson = lesson;
          if(callback)
            callback();
        });
      },
      getLength: function(callback) {
        if(typeof curLesson === 'undefined')
          fc.initFlashcards(function() {
            callback(curLesson.entries.length);
          });
        else
          callback(curLesson.entries.length);
      },
      setScope: function(entryIdx) {
        var e = curLesson.entries[entryIdx];
        $scope.$apply(function() {
          fc.curEntry.img = e.img;
          fc.curEntry.translation = e.translation;
          fc.curEntry.audio = e.audio;
        });
      },
      setEntry: function(entryIdx) {
        if(typeof curLesson === 'undefined')
          fc.initFlashcards(function() {
            if(!entryIdx)
              entryIdx = 0;
            fc.setScope(entryIdx);
          });
        else
          fc.setScope(entryIdx);
      }
    };
  }]);