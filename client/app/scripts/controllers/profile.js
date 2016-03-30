'use strict';

angular.module('app')
  .controller('ProfileCtrl', function ($scope, account, auth, toastr) {

    $scope.getProfile = function () {
      account.getProfile()
        .then(function (response) {
          $scope.user = response.data;
          if ($scope.user.vkontakte) {
            $scope.getVkUser();
          }
        })
        .catch(handleError);
    };

    $scope.updateProfile = function () {
      $scope.isUpdating = true;

      var update = {
        displayName: $scope.user.displayName,
        email: $scope.user.email
      };

      account.updateProfile(update)
        .then(function () {
          toastr.success('Profile successfuly updated', '');
        })
        .catch(handleError)
        .finally(function () {
          $scope.isUpdating = false;
        });
    };

    $scope.getVkUser = function () {
      account.getVkUser()
        .then(function (response) {
          $scope.vkUser = response.data;
        })
        .catch(handleError);
    };


    $scope.linkVk = function () {

      $scope.responseReceived = false;
      $scope.isLinking = true;

      auth.vkAuth()
        .then(function (response) {
          $scope.user = response.user;
          $scope.vkUser = response.vkUser;
        })
        .catch(handleError)
        .finally(function () {
          $scope.responseReceived = true;
          $scope.isLinking = false;
        });
    };

    $scope.unlink = function (provider) {
      auth.unlink(provider)
        .then(function (response) {
          $scope.vkUser = null;
          $scope.user = response.data;
        })
        .catch(handleError);
    };


    function handleError (reason) {
      toastr.error(reason, 'Error');
    }

    $scope.getProfile();
  });
