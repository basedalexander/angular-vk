'use strict';

angular.module('app')
  .controller('MainCtrl', function (UserModel, $state, $scope, Auth) {

    var main = this;

    $scope.currentUser = null;
    $scope.currentUserAvatar = null;
    $scope.currentAlbum = null;

    main.currentColor = 'blue';


    main.logout = function () {
      Auth.logout();
    };

    main.goAllPhotos = function () {
      $scope.currentAlbum = null;
      $state.go('albums');
    }


    $scope.$on('userLoggedIn', function (event, user) {
        event.preventDefault();
        $scope.currentUser = user;
        $state.go('albums');
    });

    $scope.$on('userLogged', function (event, user) {
        event.preventDefault();
        $scope.currentUser = user;
    });

    $scope.$on('userLoggedOut', function (event) {
      event.preventDefault();
      $scope.currentUser = null;
      $state.go('login');
    });

    $scope.$on('auth_required', function () {
      $state.go('login');
    });

    $scope.$on('albumEntered', function (event, title) {
      console.log('got title: ', title);
      $scope.currentAlbum = title;
    });
  });
