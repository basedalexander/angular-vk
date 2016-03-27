'use strict';


angular.module('app')
  .controller('RegisterCtrl', function ($scope, $state, auth) {

    $scope.user = {};

    var onSuccess = function (message) {
      $state.go('main');
    };

    var handleError = function (reason) {
      console.log('Something is wrong ', reason.message);
    };

    $scope.submit = function () {
      auth.register($scope.user)
        .then(onSuccess, handleError);
    };
  });
