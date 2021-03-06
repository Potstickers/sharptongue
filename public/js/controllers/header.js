'use strict';

angular.module('sharptung.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
      'title': 'Create New Lesson',
      'link': 'lessons/create'
    }, {
      'title': 'Browse Lessons',
      'link': 'lessons'
    }];
    
    $scope.isCollapsed = false;
}]);