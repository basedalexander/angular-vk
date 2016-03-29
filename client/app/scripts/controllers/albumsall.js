'use strict';

angular.module('app')
  .controller('AlbumsAllCtrl', function ($state, $scope, albumsModel, toastr) {
    var ctrl = this;

    $scope.albums = null;
    $scope.vkConnected = true;

    function onSuccess (response) {
      $scope.albums = response;
    }

    function handleError (reason) {
      toastr.error(reason, 'Error');
      if (reason === 'vk_id is not connected') {
        $scope.vkConnected = false;
      }
    }


    $scope.getAlbums = function () {
      albumsModel.getAll()
        .then(onSuccess)
        .catch(handleError);
    };


    ctrl.showAlbum = function (albumId) {
      $scope.$parent.currentAlbum = null;
      $state.go('albums.photos', {
        albumId: albumId
      });
    };

    $scope.getAlbums();

  });
