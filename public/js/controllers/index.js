'use strict';

angular.module('sharptung.system').controller('IndexController', ['$scope', '$routeParams', '$http', 'Global', 'Translate',function ($scope, $http, Global, Translate) {
    $scope.global = Global;
    $scope.translate = function(params) {
      Translate.get({
        text: params.text,
        lang: params.lang
      }, function(res) {
        var speech = new Audio(data.audio);
        speech.play();
        console.log(data);
      });
    };
}]);