'use strict';

angular.module('sharptung.lessons').factory('Lessons', 
  ['$resource', function($resource) {
    return $resource('lessons/:lessonId', {
    }, {
      update: { method: 'PUT' },
      getTranslatedEntries: {method: 'GET', params: {isFc: true, lang: 'es'}}
    });
}]);