'use strict';

angular.module('sharptung.score').factory('Score', ['$resource', function($resource) {
  return $resource('score/:game_id/get', {
    game_id: '@game_id'
  });  
}]);