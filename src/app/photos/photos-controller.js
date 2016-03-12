'use strict';

angular.module('app')
    .controller('PhotosCtrl', [ '$stateParams', 'PhotosModel', '$scope', '$state', 'ViewerService', 'AlbumsModel', function($stateParams, PhotosModel, $scope, $state, ViewerService, AlbumsModel) {
        var ctrl = this;
        $scope.currentPhotoPos = null;

        ctrl.albumId = $stateParams.albumId;

        AlbumsModel.getById($stateParams.albumId, function (title) {
          $scope.$parent.currentAlbum = title;
        });

        // Save album id for cases when user quits from the viewer
        $scope.lastChoosenAlbumId = $stateParams.albumId;


        ctrl.getPhotos = function() {
            PhotosModel.getAll(ctrl.albumId, function (photos) {
                $scope.photos = photos;
                $scope.$apply();
            });
        };
        ctrl.getPhotos();


        ctrl.showPhoto = function (photoID, pos) {
            // save position of chosen photo
            $scope.currentPhotoPos = pos;
            $state.go('albums.photos.viewer', {
                photoID: photoID
            });
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


    $scope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){

        if (fromState.url === toState.url) {
          ViewerService.close();

          if ($scope.photos[$scope.currentPhotoPos].pid != toParams.photoID) {
            console.log('BACK HISTORY PRESSED');
            $scope.decreaseCurrentPhotoPos();
          }
        }

        if (fromState.url === "/:photoID" && toState.url === "/:albumId/photos") {
          ViewerService.close();
        }

        console.log('fromState: ', fromState.url);
        console.log('from params:', fromParams);
        console.log('toState : ', toState.url);
        console.log('with params:', toParams);

      });

    }]);
