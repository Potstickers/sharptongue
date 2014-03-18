'use strict';

angular.module('sharptung.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
      'title': 'Articles',
      'link': 'articles'
    }, {
      'title': 'Create New Article',
      'link': 'articles/create'
    }, {
      'title': 'Lessons',
      'link:': 'lessons'
    }];
    
    $scope.isCollapsed = false;
}]);