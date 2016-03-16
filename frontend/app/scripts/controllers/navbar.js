'use strict';

angular.module('app')
  .controller('NavbarCtrl', function ($scope, authToken) {
    $scope.isAuthenticated = authToken.isAuthenticated;
  });
