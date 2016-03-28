'use strict';

angular
  .module('app', [
    'ui.router',
    'ui.bootstrap',
    'toastr'
  ])

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, toastrConfig) {

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
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
      })

      .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })

      .state('notes', {
        url: '/notes',
        templateUrl: 'views/notes.html',
        controller: 'NotesCtrl'
      })

      .state('albums', {
        url: '/albums',
        templateUrl: 'views/albums.html',
        controller: 'AlbumsCtrl',
        controllerAs: 'ctrl',
        params: {
          autoActivateChild: 'albums.all'
        }
      })

        .state('albums.all', {
          url: '/all',
          templateUrl: 'views/albums-all.html',
          controller: 'AlbumsAllCtrl',
          controllerAs: 'ctrl'
        })

        .state('albums.photos', {
          url:'/:albumId/photos',
          templateUrl: 'views/photos.html',
          controller: 'PhotosCtrl',
          controllerAs: 'ctrl'
        })

        .state('albums.photos.viewer', {
          url: '/:photoID',
          templateUrl: 'views/viewer.html',
          controller: 'ViewerCtrl',
          controllerAs: 'ctrl'
        });

    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('authInterceptor');

    angular.extend(toastrConfig, {
      autoDismiss: false,
      containerId: 'toast-container',
      maxOpened: 0,
      newestOnTop: true,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      target: 'body'
    });

    //$locationProvider.html5Mode(true);
  })


  // Auth popup handling
  .run(function ($window, $rootScope, $state) {
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



    // Autoload 'all' view  when 'albums' view loaded
    $rootScope.$on('$stateChangeSuccess', function(event, toState){
      var aac;
      if (aac = toState && toState.params && toState.params.autoActivateChild){
        $state.go(aac);
      }
    });

  })

  .constant('API_URL', 'http://localhost:3000/')
  .constant('VK_OAUTH_URL', 'https://oauth.vk.com/authorize?')
  .constant('VK_API_URL', 'https://api.vk.com/method/');
