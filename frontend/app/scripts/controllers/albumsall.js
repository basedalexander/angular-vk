'use strict';

angular.module('app')
  .controller('AlbumsAllCtrl', function ($state, $scope, albumsModel) {
    var ctrl = this;

    $scope.albums = null;
    $scope.vkConnected = true;

    function onSuccess (response) {
      $scope.albums = response;
    }

    function handleError (reason) {
      console.log('problem: ', reason);
      if (reason === 'vk_id is not connected') {
        $scope.vkConnected = false;
      }

    }

    albumsModel.getAll()
      .then(onSuccess, handleError);


    ctrl.showAlbum = function (albumId) {
      $scope.$parent.currentAlbum = null;
      $state.go('albums.photos', {
        albumId: albumId
      });
    };
  });
