'use strict';

angular.module('app')
  .controller('AlbumsAllCtrl', function ($state, $scope, albumsModel) {
    var ctrl = this;

    $scope.albums = null;

    ctrl.getAlbums = function () {
      albumsModel.getAll()
        .then(function (response) {
          $scope.albums = response;
        });
    };

    ctrl.getAlbums();

    ctrl.showAlbum = function (albumId) {
      $scope.$parent.currentAlbum = null;
      $state.go('albums.photos', {
        albumId: albumId
      });
    };
  });
