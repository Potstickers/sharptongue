# Angular Guide v0

  Mean.io angular guide and organization  
  v0 - Only goes over stuff in `public/js` or as much as Wellington bothered to read.  

## Modules

  A module is a collection of services, directives, filters, and configuration information.  
  When you use: `angular.module('myModule', [])`  
  It's saying to declare 'myModule' as a module.  
  The empty `[]` means declare it without dependencies (other modules in this case).  
  Angular modules are created globally so to access one, you simply do: `angular.module('myModule')`  
  Where you define it does not matter, as angular does not impose a structure to your app.  

#### _Mean.io's organization_
  
  The boilerplate declares 'mean' as its general module with a bunch of dependencies in `app.js` on line 3.  
  `angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles']);`  
  Two more modules are declared after as `'mean.system'` and `'mean.articles'` with no dependencies.  
  I don't think `system` and `articles` need to be prefixed by `mean` and angular doesn't care.  
  The author probably wanted to use `mean` as a namespace and `mean.abcd` as submodules.  
  Following its example, **all new modules should be declared here and only for declaring.**  

## Config

  Look in `config.js` where its setting up routing.  
  The `config()` call is the place where providers are 'injected'.  
  Angular has a lot semantics and defines each one tersely; a provider is one of them. More on this in a later version.  
  You can see that the `routeProvider` is being injected.  
  This is provided by angular to handle routing and how our endpoints are being req'ed.  
  The respective views are defined with each endpoint.  
  We can just edit the current boilerplate ones to match the endpoints on our backend.  
  
## Init

  Look in `init.js`.  
  Line 8: `angular.bootstrap(document, ['mean'])`  
  This manually initializes angular with the mean module instead of using the html directive way in the markup.  
  
## Services

  A service is a singleton and is registered with: `angular.module('myModule').factory('myService')`.  
  Look at `services/article.js`.  
  Article is registered as a service.  
  Like declaring modules, the dependencies are specified in an array following the name.  
  The `$resource` service is an angular-provided service for communicating with restful services (like our translate service).  
  **It abstracts `http` away so don't use `$http` unless really needed.**  
  The resource service is part of the `ngResource` module specified as a dependency when `mean` was declared as a module.  
  
#### _The Args_
  ```JavaScript
  ['$resource', function($resource) {
    return $resource('articles/:articleId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
  }]
  ```
  Look at where `$resource` is used as a function call.  
  - The first argument (`articles/:articleId`) is the path to the endpoint which is expected to return data.  
  - The 2nd argument (`{articleId: '@_id'}`) specifies the value which the parameter key should be.  
    In this case, the articleId parameter will be filled in with whatever `_id` is.   
  - The 3rd argument (`{update:{method:'PUT'}}`) defines the `update` action as `PUT` method.  
    How its used: `ServiceName.update({_id:strongId, otherparams:strongValue})...`
    - Usually called from respective Controller.
    Meaning the update action is called from the Servicename singleton.  
    The aforementioned `@_id` will use the value of `_id`. Same manner if referencing other values.  

## Controllers 

  Controllers are the interaction layer between view (the dom) and the model (routes in this case).  
  Look at `controllers/articles.js`  
  Like services, controllers declared as a part of a module, given a name and an array of dependencies if any.  
  
#### _The Dependencies_

  - `$scope` : The object that gets shared with the view. Stuff is passed back and forth via this object.  
    You see a bunch of CRUD ops defined on this object.  
    When bind to data in view via directives: you can call these functions from where the respective Controller is binded.  
  - `$routeParams` : Gets param values from route when matched.  
    E.g:
    ```JavaScript
    //If URL: http://server.com/index.html#/Chapter/1/Section/2?search=moby
    //and rout is defined as: /Chapter/:chapterId/Section/:sectionId
    $routeParams ==> {chapterId:1, sectionId:2, search:'moby'}
    ```
  - `$location` : Kinda like wrapper around `window.location`.  
  - `Global` : The Global service (registered in `services/global.js`).  
  - `Article` : The Article controller (registered in `services/article.js`).  
  - `function(...all that stuff from above...)` : place where you use those dependencies.    
  
  Take for e.g. the `scope.findOne` function:  
  ```JavaScript
  $scope.findOne = function() {
    Articles.get({
      articleId: $routeParams.articleId
    }, function(article) {
      $scope.article = article;
    });
  };
  ```
  - `$scope.findOne = function() {...` : exposes the findOne function to the view.  
  - `Articles.get({articleId: $routeParams.articleId}...` : Calls the get action (default provided by angular unlike the update which was custom defined in services with an object with key articleId with value of the articleId matched from route.  
  - `..., function(article) { $scope.article = article; });` : the callback when returned from server. `artcle` is whatever, the server returned. `$scope.article` cuz data binding, updates the view.  