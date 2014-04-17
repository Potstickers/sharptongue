'use strict';

angular.module('sharptung.lessons').factory('Lessons', 
  ['$resource', function($resource) {
    return $resource('lessons/:lessonId', {
    }, {
      update: { method: 'PUT' },
      getTranslatedEntries: {method: 'GET', params: {isFc: true, lang: '@lang'}}
    });
}]);

angular.module('sharptung.lessons').factory('Ratings', [
  '$resource', function($resource) {
    return $resource('lessons/ratings/:lessonId', {}, {
      rate: {method:'PUT', params: {rating: '@rating'}},
      getRatings: {method:'GET'}
    });
  }]);