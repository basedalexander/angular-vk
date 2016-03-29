'use strict';

angular.module('app')
  .controller('ViewerCtrl', function ($scope, $stateParams, viewerService, albumsModel) {
    // In case of hard reloading on this state
    if ($scope.$parent.currentPhotoPos === null) {
      console.log('Photo viewer hard reloading, fetching album photos...');


      albumsModel.getPhotosById($stateParams.albumId)
        .then(function (photos) {
          var len = photos.length;
          for (var i = 0; i < len; i = i + 1) {
            if (photos[i].pid === $stateParams.photoID) {
              console.log('found position ', i);
              $scope.$parent.currentPhotoPos = i;
              break;
            }
          }
        }, function () {
          console.log('cannot get photos for viewer');
        });
    }

    if (!viewerService.isOpened) {
      viewerService.open($scope.$parent);
    }

  });

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('app')
  .controller('ModalInstanceCtrl', function ($scope, $state, $uibModalInstance) {
    console.log('modal ctrl');

    $scope.next = function () {

      var curr = $scope.$parent.increaseCurrentPhotoPos();
      var photoID = $scope.$parent.photos[curr].pid;
      $state.go('albums.photos.viewer', {
        photoID: photoID
      });

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
      });
    };
  });
