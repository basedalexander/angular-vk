'use strict';

angular.module('app')
  .controller('LoginCtrl', function ($scope, $state, auth, toastr) {

    var onSuccess = function () {
      $state.go('main');
    };

    var handleError = function (reason) {
      toastr.error(reason.message , 'Error');
    };


    $scope.submit = function () {
      auth.login($scope.loginEmail, $scope.loginPassword)
        .then(onSuccess, handleError);
    };

    $scope.vkAuth = function () {
      auth.vkAuth().then(onSuccess, handleError);
    };
  });
