'use strict';

angular.module('app')
  .factory('viewerService', ['$uibModal', '$state', '$log', function ($uibModal, $state, $log) {
    var isOpened = false;
    var modalInstance;

    function open (scope) {
      console.log('OPEN');
      modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        scope: scope,
        size: 'lg'
      });

      isOpened = true;

      modalInstance.result.then(function (selectedItem) {}, function () {
        isOpened = false;
        console.log('WARHAAAAAA');
        $state.go('albums.photos', {
          albumId: scope.lastChoosenAlbumId
        });
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    function close () {
      modalInstance.close();
      isOpened = false;
    }

    return {
      open: open,
      close: close
    }
  }]);
