'use strict';

angular.module('app')
  .controller('MainCtrl', function (UserModel, $state, $scope, Auth) {

    var main = this;

    $scope.currentUser = null;
    $scope.currentUserAvatar = null;

    main.currentColor = 'blue';


    main.logout = function () {
      Auth.logout();
    };


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
  });
