'use strict';

angular.module('app')
  .controller('HeaderCtrl', ['$scope', 'Auth', 'UserModel', function ($scope, Auth, UserModel) {

    var header = this;

    $scope.currentUser = null;
    $scope.getCurrentUser = UserModel.getCurrentUser;

    $scope.isAuthenticated = Auth.isAuthenticated;
  }]);


