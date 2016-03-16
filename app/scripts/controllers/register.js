'use strict';


angular.module('app')
  .controller('RegisterCtrl', function ($scope, auth) {
    $scope.submit = function () {
      auth.register($scope.email, $scope.password);
    };
  });
