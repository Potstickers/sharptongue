'use strict';

angular.module('sharptung.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
      'title': 'Create New Lesson',
      'link': 'lessons/create'
    }, {
      'title': 'Lessons',
      'link:': 'lessonss'
    }, {
      'title': 'My Life',
      'link': 'my/life'
    }];
    
    $scope.isCollapsed = false;
}]);