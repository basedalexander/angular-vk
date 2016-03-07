'use strict';

angular.module('app')
    .controller('PhotosCtrl', [ '$stateParams', 'PhotosModel', '$scope', '$state',  function($stateParams, PhotosModel, $scope, $state) {
        var ctrl = this;
        $scope.currentPhotoPos = null;

        ctrl.albumId = $stateParams.albumId;

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
    }]);
