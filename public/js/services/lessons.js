'use strict';

angular.module('sharptung.lessons').factory('Lessons', 
  ['$resource', function($resource) {
    return $resource('lessons/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
}]);