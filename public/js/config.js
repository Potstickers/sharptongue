'use strict';

//Setting up route
angular.module('sharptung').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/translate/:text/to/:lang', {
          template: ' '
        }).
        when('/lessons', {
          templateUrl: 'views/lessons/list.html'
        }).
        when('/lessons/create', {
          //create lesson form
          templateUrl: 'views/lessons/create.html'
        }).
        when('/lessons/:lessonId', {
          templateUrl: 'views/lessons/view.html'
        }).
        when('lessons/ratings/:lessonId', {
          template: ' '
        }).
        when('/settings', {
          templateUrl: 'views/settings.html'
        }).
        when('/score/:game_id/get', {
          template: ' '
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

/*
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
        when('/lessons/:id', {
          //default lesson route
          templateUrl: 'views/lessons/view.html'
        }).
        when('/lessons/:id/edit', {
          //same for with populated fields
          templateUrl: 'views/lessons/edit.html'
        }).
        when('/lessons/:id/flashcards', {
          //flashcards route, shall have dedicated controller but no service.
          //this and future games shall use a stat tracking service.
          templateUrl: 'views/lessons/flashcards.html'
        }).*/