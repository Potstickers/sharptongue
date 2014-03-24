'use strict';

angular.module('sharptung.lessons').factory('Lessons', 
  ['$resource', function($resource) {
    return $resource('lessons/:lessonId', {
    }, {
      update: { method: 'PUT' }
    });
}]);