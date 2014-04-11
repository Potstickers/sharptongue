'user strict';
angular.module('sharptung.lessons').directive('lessonCreator', function() {
  console.log('create lesson directive');
  return function(scope, elem, attrs) {
    var element = function(selector) {
      return angular.element(document.querySelector(selector));
    };
    
    var curIdx = 0;
    
    scope.lesson = {
      title: "",
      entries: []
    };
    scope.newEntry = function() {
      scope.lesson.entries.push({
        entry: "",
        img: ""
      });

      console.log(scope.lesson);
      //expect input for word
      console.log(element('form#deck section[index="'+curIdx+'"]').children()[0]);
      //expect input for img url
      console.log(element('form#deck section[index="'+curIdx+'"]').children()[1]);
    };
  };
});