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
    scope.removeEntry = function(index) {
      element('form#deck section[index="'+index+'"]').remove();
      scope.lesson.entries.splice(index, 1);
    };
    scope.newEntry = function() {
      scope.lesson.entries.push({
        entry: "",
        img: ""
      });

      console.log(scope.lesson);
    };
  };
});