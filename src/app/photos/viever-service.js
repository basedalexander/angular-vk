'use strict';

angular.module('app')
  .factory('ViewerService', ['$uibModal', '$state', '$log', function ($uibModal, $state, $log) {


    var isOpened = false;

    function open (scope) {
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        scope: scope,
        size: 'lg'
        });

      isOpened = true;

      modalInstance.result.then(function (selectedItem) {}, function () {
        $state.go('albums.photos', {
          albumId: scope.lastChoosenAlbumId
        });
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    return {
      open: open
    }
  }]);
