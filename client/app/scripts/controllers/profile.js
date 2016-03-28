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
      var update = {
        displayName: $scope.user.displayName,
        email: $scope.user.email
      };

      account.updateProfile(update)
        .then(function (response) {
          toastr.success('Profile successfuly updated', '');
        })
        .catch(handleError);
    };

    $scope.getVkUser = function () {
      account.getVkUser()
        .then(function (response) {
          $scope.vkUser = response.data;
        })
        .catch(handleError);
    };


    $scope.linkVk = function () {
      auth.vkAuth()
        .then(function (response) {
          $scope.user = response.user;
          $scope.vkUser = response.vkUser;
        })
        .catch(handleError);
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
