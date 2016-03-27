'use strict';

angular.module('app')
  .controller('SettingsCtrl', function ($scope, userModel) {

    userModel.getUser()
      .then(onSuccess, handleError);

    function onSuccess (response) {
      $scope.user = response;

      if (response.vk_id) {
        $scope.getVkUser();
      }
    }

    function handleError (reason) {
      console.log('setting, error gettting user ', reason.message);
    }

    $scope.connectVK = function () {
      userModel.connectVK()
        .then(onSuccess, handleError);
    };

    $scope.disconnectVK = function () {
      userModel.disconnectVK()
        .then(function (response) {
          $scope.vkUser = null;
          onSuccess(response);
        }, handleError);
    };


    $scope.getVkUser = function () {
      if ($scope.user.vk_id) {
        userModel.getVkUser()
          .then(function (response) {
            $scope.vkUser = response;
          }, handleError);
      }
    };

    $scope.updateUser = function () {
      var update = {
        displayName: $scope.user.displayName
      };

      userModel.updateUser(update)
        .then(onSuccess, handleError);
    };
  });
