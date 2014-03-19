'use strict';

angular.module('sharptung', 
  ['ngCookies',
   'ngResource', 
   'ngRoute', 
   'ui.bootstrap', 
   'ui.route', 
   'sharptung.system', 
   'sharptung.articles', 
   'sharptung.translate',
   'sharptung.lessons',
   'sharptung.domutils',
   'sharptung.score']);

angular.module('sharptung.system', []);
angular.module('sharptung.articles', []);
angular.module('sharptung.translate', []);
angular.module('sharptung.lessons', []);
angular.module('sharptung.domutils', []);
angular.module('sharptung.score', []);