'use strict';

angular.module('sharptung.system').directive('translateclick', function() {
  return function(scope, elem, attrs) {
    elem.bind('click', function () {
      var text = angular.element(document.querySelector('#translate')).val();
      scope.translate({
        text: text,
        lang: 'es'
      });
    });
  };
});