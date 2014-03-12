'use strict';

angular.module('sharptung.system').directive('translateclick', function() {
  return function(scope, elem, attrs) {
    elem.bind('click', function () {
      var text = angular.element(document.querySelector('#translate')).val();
      var lang = angular.element(document.querySelector('#language_list')).val();
      scope.translate({
        text: text,
        lang: lang
      });
    });
  };
});