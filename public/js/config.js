'use strict';

//Setting up route
angular.module('sharptung').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/translate/:text/to/:lang', {
          template: ' '
        }).
        when('/lessons', {
          templateUrl: 'views/lessons.html'
        }).
        when('/lessons/:title', {
          //default lesson route
          templateUrl: 'views/lessons/view.html'
        }).
        when('/lessons/create', {
          //create lesson form
          templaterlL: 'views/lessons/create.html'
        }).
        when('/lessons/:title/edit', {
          //same for with populated fields
          templateUrl: 'views/lessons/edit.html'
        }).
        when('/lessons/:title/flashcards', {
          //flashcards route, shall have dedicated controller but no service.
          //this and future games shall use a stat tracking service.
          templateUrl: 'views/lessons/flashcards.html'
        }).
        when('/articles', {
          templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
          templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
          templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
          templateUrl: 'views/articles/view.html'
        }).
        when('/', {
          templateUrl: 'views/index.html'
        }).
        otherwise({
          redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('sharptung').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);