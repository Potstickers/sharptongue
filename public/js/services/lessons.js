'use strict';

angular.module('sharptung.lessons').factory('Lessons', 
  ['$resource', function($resource) {
    return $resource('lessons/:lessonId', {
    }, {
      update: { method: 'PUT' },
      getTranslatedEntries: {method: 'GET', params: {lang: '@lang'}}
    });
}]);

angular.module('sharptung.lessons').factory('Ratings', [
  '$resource', '$routeParams', function($resource, $routeParams) {
    return $resource('lessons/ratings/:lessonId', {lessonId: $routeParams.lessonId}, {
      rate: {method:'PUT', params: {rating: '@rating', lessonId: $routeParams.lessonId}},
      getRatings: {method:'GET'}
    });
  }]);