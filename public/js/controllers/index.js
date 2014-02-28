'use strict';

angular.module('sharptung.system').controller('IndexController', 
  ['$scope', '$routeParams', '$http', 'Global', 'Translate',
  function ($scope, $routeParams, $http, Global, Translate) {
    $scope.global = Global;
    //move into directive later
    $scope.translateClicked = function() {
      var text = angular.element(document.querySelector('#translate')).val();
      Translate.get({
        text: params.text,
        lang: params.lang
      }, function(res) {
        var speech = new Audio(res.audio);
        speech.play();
        console.log(res);
      });
    };
    $scope.translate = function(params) {
      Translate.get({
        text: params.text,
        lang: params.lang
      }, function(res) {
        var speech = new Audio(res.audio);
        speech.play();
        console.log(res);
      });
    };
}]);