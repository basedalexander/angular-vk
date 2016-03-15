'use strict';

angular
  .module('app', [
    'ui.router',
    'ngAnimate'
  ])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider

      .state('main', {
        url: '/',
        controller: 'MainCtrl'
      });


    $locationProvider.html5Mode(true);
  });
