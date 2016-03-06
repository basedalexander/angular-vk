angular.module('app')
.controller('ViewerCtrl', function ($scope, $uibModal, $log, $stateParams, $state, $rootScope) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.currentPhoto = $stateParams.photoID;
  console.log('stateParams are : ' , $stateParams)  ;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $state.go('albums.photos', {
        albumId: $rootScope.lastChoosenAlbumId
      });
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.open('lg');

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('app')
    .controller('ModalInstanceCtrl', function ($scope, $state, $uibModalInstance, items, $rootScope) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
    console.log('OK');
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
    $state.go('albums.photos', {
      albumId: $rootScope.lastChoosenAlbumId
    })
  };
});
