'use strict';

angular.module('app', [
  'ui.router',
  'app.common',
  'ngAnimate',
  'ui.bootstrap'
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
        templateUrl: 'app/albums/albums.tmpl.html',
        controller: 'AlbumsCtrl',
        controllerAs: 'ctrl',
        params: {
          autoActivateChild: 'albums.all'
          },
        resolve: {
          'currentUser': ['Auth', function (Auth) {
            console.log('resolving /albums');
            return Auth.requireAuth();
          }]
        }
      })
          .state('albums.all', {
            url: '/all',
            templateUrl: 'app/albums/albums-all.tmpl.html',
            controller: 'AlbumsAllCtrl',
            controllerAs: 'ctrl'
          })
          .state('albums.photos', {
            url:'/:albumId/photos',
            templateUrl: 'app/photos/photos.tmpl.html',
            controller: 'PhotosCtrl',
            controllerAs: 'ctrl'
          })
            .state('albums.photos.viewer', {
              url: '/:photoID',
              templateUrl: 'app/photos/viewer.tmpl.html',
              controller: 'ViewerCtrl',
              controllerAs: 'ctrl'
            })
      ;
    $urlRouterProvider.otherwise('/albums/all');
  }])

  // If user isn't authenticated redirect him to login state
  .run(function ($rootScope, $state, Auth, AlbumsModel, ViewerService) {
    $rootScope.$on('$stateChangeError', function (event, message) {
      event.preventDefault();
      console.log(event);
      console.log('message', message);
      $state.go('login');

    });

    // Detecting hard reloading on particular album state
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (toParams.albumId) {
        AlbumsModel.getById(toParams.albumId, function (title) {
          $rootScope.$broadcast('albumEntered', title);
        })
      }
    });

    // Autoload 'all' view  when 'albums' view loaded
    $rootScope.$on('$stateChangeSuccess', function(event, toState){
        var aac;
        if (aac = toState && toState.params && toState.params.autoActivateChild){
            $state.go(aac);
        }
    });


  })
;
