'use strict';

angular.module('app')
  .controller('LoginCtrl', function ($scope, $state, auth) {

    var onSuccess = function (message) {
      $state.go('main');
    };

    var handleError = function (reason) {
      console.log('Something is wrong ', reason.message);
    };


    $scope.submit = function () {
      auth.login($scope.loginEmail, $scope.loginPassword)
        .then(onSuccess, handleError);
    };

    $scope.vkAuth = function () {
      auth.vkAuth().then(onSuccess, handleError);
    };
  });
