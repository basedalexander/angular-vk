'use strict';


angular.module('app')
  .controller('RegisterCtrl', function ($scope, $state, auth, toastr) {

    $scope.user = {};

    var onSuccess = function () {
      $state.go('main');
    };

    var handleError = function (reason) {
      toastr.error(reason.message , 'Error');
    };

    $scope.submit = function () {
      auth.register($scope.user)
        .then(onSuccess, handleError);
    };
  });
