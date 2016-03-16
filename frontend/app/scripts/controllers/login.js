'use strict';

angular.module('app')
  .controller('LoginCtrl', function ($scope, auth) {


    $scope.submit = function () {
      auth.login($scope.email, $scope.password);
    };
  });
