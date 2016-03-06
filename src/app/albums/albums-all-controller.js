'use strict';

angular.module('app')
  .controller('AlbumsAllCtrl', [ '$state', 'AlbumsModel', '$scope', function ($state, AlbumsModel, $scope) {
    console.log('AlbumsAllCtrl');

    var ctrl = this;

    $scope.albums = null;

    ctrl.getAlbums = function () {
      AlbumsModel.getAll(function (albums) {
        $scope.albums = albums;
        $scope.$apply();
      });
    };

    ctrl.getAlbums();

    ctrl.showAlbum = function (albumId) {
      $state.go('albums.photos', {
        albumId: albumId
      });
    };
  }]);

