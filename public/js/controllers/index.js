'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
    $scope.global = Global;
    $scope.fetchTTS = function() {
      console.log('clicked');
    	var myTranslate = document.getElementById("translate").value;
        if (myTranslate !== null) {
          $http({
            url: 'translate/quick/to/es',
              method : 'GET'
            }).success(function(data) {
              if (data) {
                var speech = new Audio(data.audio);
                speech.play();
                console.log(data);
              }
          });
      }
    };
}]);