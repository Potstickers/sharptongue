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
      initFlashcards: function() {
        $scope.findOne(function(lesson) {
          curLesson = lesson;
          this.curEntry.img = curLesson.entries[0].img,
          this.curentry.translation = curLesson.entries[0].translation;
          this.curEntry.audio = curLesson.entries[0].audio;
        });
      },
      getLength: function() {
        if(typeof curLesson === 'undefined')
          this.initFlashcards();
        return curLesson.entries.length;
      },
      getEntry: function(entryIdx) {
        if(typeof curLesson === 'undefined')
          this.initFlashcards();

        this.curEntry.img = curLesson.entries[curIdx].img;
        this.curEntry.translation = curLesson.entries[curIdx].translation;
        this.curEntry.audio = curLesson.entries[curIdx].audio;

        return curLesson.entries[curIdx];
      }
    }
  }]);