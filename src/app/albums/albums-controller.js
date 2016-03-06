'use strict';

angular.module('app')
  .controller('AlbumsCtrl', function ($state, AlbumsModel, $scope) {
    console.log('AlbumsCtrl');
    var ctrl = this;

    $scope.albums = null;

    ctrl.getAlbums = function () {
      AlbumsModel.getAll(function (albums) {
        $scope.albums = albums;
        $scope.$apply();
      });
    };

    ctrl.getAlbums();

    ctrl.showPhotos = function (albumId, album) {
      $state.go('photos', {
        albumId: albumId
      });
    };
  });

