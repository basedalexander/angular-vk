'use strict';

angular.module('app')
  .controller('AlbumsAllCtrl', function ($state, $scope, albumsModel, toastr) {
    var ctrl = this;

    $scope.albums = null;
    $scope.vkConnected = true;

    function onSuccess (response) {
      $scope.albums = response.data;
    }

    function handleError (response) {
      if (response.data.message && response.data.message === 'vkontakte is not connected') {
        $scope.vkConnected = false;
        return;
      }
      toastr.error(response.data.message, 'Error');
    }


    $scope.getAlbums = function () {
      $scope.responseReceived = false;

      albumsModel.getAll()
        .then(onSuccess)
        .catch(handleError)
        .finally(function () {
          $scope.responseReceived = true;
        });
    };


    ctrl.showAlbum = function (albumId) {
      $scope.$parent.currentAlbum = null;
      $state.go('albums.photos', {
        albumId: albumId
      });
    };

    $scope.getAlbums();

  });
