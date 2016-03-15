'use strict';

angular
  .module('app', [
    'ui.router',
    'ngAnimate'
  ])

  .config(function ($stateProvider, $urlRouterProvider) {

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

    //$locationProvider.html5Mode(true);
  });