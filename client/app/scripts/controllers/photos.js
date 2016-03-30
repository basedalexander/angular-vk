'use strict';

angular.module('app')
  .controller('PhotosCtrl', function ($state, $stateParams, $scope, albumsModel, viewerService, toastr) {
    var ctrl = this;

    $scope.currentPhotoPos = null;

    ctrl.albumId = $stateParams.albumId;
    $scope.lastChoosenAlbumId = $stateParams.albumId;

    // Set current album's title

    $scope.getAlbumTitle = function (albumId) {
      albumsModel.getAlbumTitle(albumId)
        .then(function (title) {
          $scope.$parent.currentAlbum = title;
        })
        .catch(function (response) {
          toastr.errror(response.data.message, 'Error');
        });
    };

    $scope.getPhotosByAlbumId = function (albumId) {
      $scope.responseReceived = false;

      albumsModel.getPhotosById(albumId)
        .then(function (response) {
          $scope.photos = response.data;
        })
        .catch(function (response) {
          toastr.errror(response.data.message, 'Error');
        })
        .finally(function () {
          $scope.responseReceived = true;
        });
    };

    $scope.getAlbumTitle(ctrl.albumId);
    $scope.getPhotosByAlbumId(ctrl.albumId);


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

    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
        if (fromState.url === toState.url) {
          viewerService.close();
          if ($scope.photos[$scope.currentPhotoPos].pid !== +toParams.photoID) {
            console.log('BACK HISTORY PRESSED');
            $scope.decreaseCurrentPhotoPos();
          }
        }

        if (fromState.url === '/:photoID' && toState.url === '/:albumId/photos') {
          viewerService.close();
        }

      });
  });
