'use strict';

angular.module('sharptung.lessons').factory('Lessons', 
  ['$resource', function($resource) {
    return $resource('lessons/:lessonId', {
    }, {
      update: { method: 'PUT' },
      getTranslatedEntries: {method: 'GET', params: {isFc: true, lang: 'es'}}
    });
}]);

angular.module('sharptung.lessons').factory('Ratings', [
  '$resource', function($resource) {
    return $resource('lessons/ratings/:lessonId', {}, {
      rate: {method:'PUT'},
      getRatings: {method:'GET', params: {rating: '@rating'}}
    });
  }]);