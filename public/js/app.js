'use strict';

angular.module('sharptung', 
  ['ngCookies',
   'ngResource', 
   'ngRoute', 
   'ui.bootstrap', 
   'ui.route', 
   'sharptung.system', 
   'sharptung.articles', 
   'sharptung.translate']);

angular.module('sharptung.system', []);
angular.module('sharptung.articles', []);
angular.module('sharptung.translate', []);