'use strict';

angular.module('app')
  .controller('SettingsCtrl', function ($scope, userModel) {

    userModel.getData()
      .then(onSuccess, handleError);

    function onSuccess (response) {
      $scope.user = response;
      console.log('settings, got user: ', response);
    }

    function handleError (reason) {
      console.log('setting, error gettting user ', reason);
    }

    $scope.attachVK = function () {
      userModel.attachVK()
        .then(onSuccess, handleError);
    }
  });
