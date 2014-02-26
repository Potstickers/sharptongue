'use strict';

angular.module('sharptung.translate').factory('Translate', ['$resource', function($resource) {
  return $resource('translate/:text/to/:lang', {
    text: '@text',
    lang: '@lang'
  });  
}]);