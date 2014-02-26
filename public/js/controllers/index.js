'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
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
                var speech = new Audio(data.treanslate);
                speech.play();
                console.log(data);
              }
          });
      }
    };
}]);