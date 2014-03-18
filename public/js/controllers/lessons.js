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
    
    $scope.findOne = function() {
      Lessons.get({
        _id: $routeParams.id
      }, function(lesson) {
        $scope.lesson = lesson;
      });
    };
  }]);