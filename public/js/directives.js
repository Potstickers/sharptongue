'use strict';

angular.module('shartung.system').directive('translateClick', function() {
  return function(scope, elem, attrs) {
    elem.bind('click', function () {
      var text = elem.val();
      scope.translate({
        text: text,
        lang: 'es'
      });
    });
  };
});