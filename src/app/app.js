'use strict';

angular.module('app', [
  'ui.router',
  'app.common',
  '720kb.tooltips'
])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'app/login/login.tmpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('albums', {
        url:'/albums',
        templateUrl: 'app/albums/albums-mdv.tmpl.html',
        controller: 'AlbumsCtrl',
        controllerAs: 'ctrl',
        resolve: {
          'currentUser': ['Auth', function (Auth) {
            console.log('resolving /albums');
            return Auth.requireAuth();
          }]
        }
      })
      .state('photos', {
        url:'/albums/:albumId/photos',
        templateUrl: 'app/photos/photos-mdv.tmpl.html',
        controller: 'PhotosCtrl',
        controllerAs: 'ctrl',
        resolve: {
          'currentUser': ['Auth', function (Auth) {
            console.log('resolving /photos');
            return Auth.requireAuth();
          }]
        }
      })
    ;
    $urlRouterProvider.otherwise('/');
  }])
  .run(function ($rootScope, $state, Auth, AlbumsModel) {
    $rootScope.$on('$stateChangeError', function (event, message) {
      event.preventDefault();
      console.log(event);
      console.log('message', message);
      $state.go('login');

    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (toParams.albumId) {
        console.log('album entered event');
        AlbumsModel.getById(toParams.albumId, function (title) {
          $rootScope.$broadcast('albumEntered', title);
        })
      }
    })
  })
;
