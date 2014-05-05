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
  '$resource', '$routeParams', function($resource) {
    return $resource('lessons/ratings/:lessonId',{}, {
      rate: {method:'PUT', params: {rating: '@rating', lessonId: '@lessonId'}},
      getRatings: {method:'GET'}
    });
  }]);