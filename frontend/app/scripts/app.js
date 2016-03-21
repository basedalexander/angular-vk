'use strict';

angular
  .module('app', [
    'ui.router'
  ])

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider

      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

      .state('photos', {
        url: '/photos',
        templateUrl: 'views/photos.html',
        controller: 'PhotosCtrl'
      })

      .state('notes', {
        url: '/notes',
        templateUrl: 'views/notes.html',
        controller: 'NotesCtrl'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })

      .state('logout', {
        url: '/logout',
        controller: 'LogoutCtrl'
      })

      .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      });

    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('authInterceptor');

    //$locationProvider.html5Mode(true);
  })

  .run(function ($window) {

    var params = $window.location.search.substring(1);

    if (params && $window.opener && $window.opener.location.origin) {
      var pair = params.split('=');
      var type = pair[0];
      var code = decodeURIComponent(pair[1]);
      console.log('type :', type);
      console.log('code: ', code);

      if (type === 'error') {
        return $window.opener.postMessage(type, $window.location.origin);
      }

      $window.opener.postMessage(code, $window.location.origin);
    }
  })

  .constant('API_URL', 'http://localhost:3000/')
  .constant('VK_OAUTH_URL', 'https://oauth.vk.com/authorize?');
