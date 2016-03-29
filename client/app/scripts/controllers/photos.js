'use strict';

angular.module('app')
  .controller('PhotosCtrl', function ($state, $stateParams, $scope, albumsModel, viewerService) {
    var ctrl = this;

    $scope.currentPhotoPos = null;

    ctrl.albumId = $stateParams.albumId;
    $scope.lastChoosenAlbumId = $stateParams.albumId;

    // Set current album's title
    albumsModel.getTitleById(ctrl.albumId)
      .then(function (title) {
        $scope.$parent.currentAlbum = title;
      }, function (reason) {
        console.log('Can\'t get albums\'s title' , reason);
      });


    albumsModel.getPhotosById(ctrl.albumId)
      .then(function (photos) {
        $scope.photos = photos;
      }, function (reason) {
        console.log('cannot get album\'s photos ', reason);
      });

    ctrl.showPhoto = function (photoID, pos) {
      // save position of chosen photo
      $scope.currentPhotoPos = pos;
      $state.go('albums.photos.viewer', {
        photoID: photoID
      });
    };


    // Tooltip's settings
    $scope.placement = {
      options: [
        'top',
        'top-left',
        'top-right',
        'bottom',
        'bottom-left',
        'bottom-right',
        'left',
        'left-top',
        'left-bottom',
        'right',
        'right-top',
        'right-bottom'
      ],
      selected: 'top'
    };



    $scope.increaseCurrentPhotoPos = function () {
      var curr = $scope.currentPhotoPos;
      var len = $scope.photos.length;

      if (curr < len - 1) {
        curr++;
      } else {
        curr = 0;
      }
      $scope.currentPhotoPos = curr;
      return curr;
    };

    $scope.decreaseCurrentPhotoPos = function () {
      var curr = $scope.currentPhotoPos;
      var len = $scope.photos.length;

      if (curr > 0) {
        curr--;
      } else {
        curr = len - 1;
      }

      $scope.currentPhotoPos = curr;
      return curr;
    };

    $scope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState){

        if (fromState.url === toState.url) {
          viewerService.close();

          if ($scope.photos[$scope.currentPhotoPos].pid !== toParams.photoID) {
            console.log('BACK HISTORY PRESSED');
            $scope.decreaseCurrentPhotoPos();
          }
        }

        if (fromState.url === '/:photoID' && toState.url === '/:albumId/photos') {
          viewerService.close();
        }

      });

  });
