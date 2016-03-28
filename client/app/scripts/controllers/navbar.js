'use strict';

angular.module('app')
  .controller('NavbarCtrl', function ($scope, authToken, userModel) {
    $scope.isAuthenticated = authToken.isAuthenticated;
    $scope.blankAvatar= 'http://mpark.pro/templates/mpark/dleimages/noavatar.png';
    $scope.getCachedUser = userModel.getCachedUser;
  });
