'use strict';

angular.module('app')
  .controller('MainCtrl', ['$scope', 'Auth', '$state',  function ($scope, Auth, $state) {

    //$scope.$on('userLoggedIn', function (event, user) {
    //    event.preventDefault();
    //    $scope.currentUser = user;
    //    $state.go('albums');
    //});
    //
    //// Checks whether user is already logged on initialization stage
    //$scope.$on('userLogged', function (event, user) {
    //    event.preventDefault();
    //    $scope.currentUser = user;
    //});
    //
    //// Log out button clicked
    //$scope.$on('userLoggedOut', function (event) {
    //  event.preventDefault();
    //  $scope.currentUser = null;
    //  $state.go('login');
    //});
    //
    //// Init stage: if user isn't already logged in - redirect him to login state
    //$scope.$on('auth_required', function () {
    //  $state.go('login');
    //});
  }]);
