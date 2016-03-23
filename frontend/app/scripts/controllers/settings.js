'use strict';

angular.module('app')
  .controller('SettingsCtrl', function ($scope, userModel) {

    userModel.getData()
      .then(onSuccess, handleError);

    function onSuccess (response) {
      $scope.user = response;

      if (response.vk_id) {
        $scope.getVkUser();
      }
    }

    function handleError (reason) {
      console.log('setting, error gettting user ', reason);
    }

    $scope.attachVK = function () {
      userModel.attachVK()
        .then(onSuccess, handleError);
    };

    $scope.detachVK = function () {
      userModel.detachVK()
        .then(function (response) {
          $scope.vkUser = null;
          onSuccess(response);
        }, handleError);
    };


    $scope.getVkUser = function () {
      if ($scope.user.vk_id) {
        userModel.getVkUser($scope.user.vk_id)
          .then(function (response) {
            $scope.vkUser = response;
          }, handleError);
      }
    };

    $scope.updateUser = function () {
      var update = {
        name: $scope.user.name
      };

      userModel.updateUser(update)
        .then(onSuccess, handleError);
    }
  });
