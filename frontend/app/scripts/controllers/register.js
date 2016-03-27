'use strict';


angular.module('app')
  .controller('RegisterCtrl', function ($scope, auth) {

    $scope.user = {};

    var onSuccess = function (message) {
      console.log('success ', message);
    };

    var handleError = function (reason) {
      console.log('Something is wrong ', reason.message);
    };

    $scope.submit = function () {
      auth.register($scope.user)
        .then(onSuccess, handleError);
    };
  });
