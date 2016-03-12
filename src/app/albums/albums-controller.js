'use strict';

angular.module('app')
  .controller('AlbumsCtrl', [ '$state', '$scope', function ($state, $scope) {
    var ctrl = this;

    $scope.currentAlbum = null;

    ctrl.goAllPhotos = function () {
      $state.go('albums');
    };
  }]);

