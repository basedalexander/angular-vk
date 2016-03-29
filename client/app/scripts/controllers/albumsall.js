'use strict';

angular.module('app')
  .controller('AlbumsAllCtrl', function ($state, $scope, albumsModel, toastr) {
    var ctrl = this;

    $scope.albums = null;
    $scope.vkConnected = true;

    function onSuccess (response) {
      $scope.albums = response;
    }

    function handleError (response) {
      if (response.message === 'vkontakte is not connected') {
        $scope.vkConnected = false;
        return;
      }
      toastr.error(response.message, 'Error');
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
