'use strict';

angular.module('app')
  .controller('LoginCtrl', function ($scope, auth) {

    var onSuccess = function (message) {
      console.log('success ', message);
    };

    var handleError = function (reason) {
      console.log('Something is wrong ', reason);
    };


    $scope.submit = function () {
      auth.login($scope.loginEmail, $scope.loginPassword)
        .then(onSuccess, handleError);
    };

    $scope.loginVK = function () {
      auth.loginVK().then(onSuccess, handleError);
    };
  });
