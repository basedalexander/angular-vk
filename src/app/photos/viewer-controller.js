angular.module('app')
.controller('ViewerCtrl', [ '$scope','$stateParams', 'ViewerService', function ($scope, $stateParams, ViewerService) {

  // In case of hard reloading on this state
  if ($scope.$parent.currentPhotoPos === null) {
    console.log('Photo viewer hard reloading, fetching album photos...');
    VK.Api.call('photos.get', { album_id: $stateParams.albumId}, function (res) {
      for (var i = 0; i < res.response.length; i++) {
        if (res.response[i].pid === +$stateParams.photoID) {
          $scope.$parent.currentPhotoPos = i;
          $scope.$parent.$apply();
        }
      }
    });
  }

  if (!ViewerService.isOpened) {
    ViewerService.open($scope.$parent);
  }

}]);

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('app')
    .controller('ModalInstanceCtrl', function ($scope, $state, $uibModalInstance) {
    console.log('modal ctrl');

     $scope.next = function () {
       var currPos = $scope.$parent.currentPhotoPos;
       var len = $scope.$parent.photos.length;
       var photoID;

       if (currPos < len - 1) {
         currPos++;
       } else {
         currPos = 0;
       }
       photoID = $scope.$parent.photos[currPos].pid;
       $uibModalInstance.close();
       $state.go('albums.photos.viewer', {
           photoID: photoID
       });

       $scope.$parent.currentPhotoPos = currPos;

     };

     $scope.prev = function () {
       var currPos = $scope.$parent.currentPhotoPos;
       var len = $scope.$parent.photos.length;
       var photoID;

       if (currPos > 0) {
         currPos--;
       } else {
         currPos = len - 1;
       }

       photoID = $scope.$parent.photos[currPos].pid;
       $uibModalInstance.close();
       $state.go('albums.photos.viewer', {
           photoID: photoID
       });
     };


  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
    $state.go('albums.photos', {
      albumId: $scope.$parent.lastChoosenAlbumId
    })
  };
});
