'use strict';

angular.module('app')
  .controller('AlbumsCtrl', [ '$state', '$scope', function ($state, $scope) {
    var ctrl = this;

    $scope.currentAlbum = null;

    ctrl.goAllPhotos = function () {
      $scope.currentAlbum = null;
      $state.go('albums');
    };

    $scope.$on('albumEntered', function (event, title) {
      $scope.currentAlbum = title;
      $scope.$apply()
    });
  }]);

