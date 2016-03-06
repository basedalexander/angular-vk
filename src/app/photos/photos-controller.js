'use strict';

angular.module('app')
    .controller('PhotosCtrl', [ '$stateParams', 'PhotosModel', '$scope', '$state', '$rootScope', function($stateParams, PhotosModel, $scope, $state, $rootScope) {
        var ctrl = this;

        ctrl.albumId = $stateParams.albumId;
        $rootScope.lastChoosenAlbumId = $stateParams.albumId;


        ctrl.getPhotos = function() {
            PhotosModel.getAll(ctrl.albumId, function (photos) {
                ctrl.photos = photos;
                $scope.$apply();
            });
        };

        ctrl.getPhotos();

        ctrl.showPhoto = function (photoID) {
            console.log('showPhoto: ', photoID);
            $state.go('albums.photos.viewer', {
                photoID: photoID
            });
        }


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
