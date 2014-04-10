'user strict';
angular.module('sharptung.lessons').directive('lessonCreator', function() {
  console.log('create lesson directive');
  return function(scope, elem, attrs) {
    var element = function(selector) {
      return angular.element(document.querySelector(selector));
    };

    scope.lesson = {
      title: "",
      entries: []
    };
  };
});