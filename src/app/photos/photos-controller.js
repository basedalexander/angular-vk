'use strict';

angular.module('app')
    .controller('PhotosCtrl', [ '$stateParams', 'PhotosModel', '$scope', '$state', function($stateParams, PhotosModel, $scope, $state) {
        var ctrl = this;

        ctrl.albumId = $stateParams.albumId;

        ctrl.getPhotos = function() {
            PhotosModel.getAll(ctrl.albumId, function (photos) {
                ctrl.photos = photos;
                $scope.$apply();
            });
        };

        ctrl.getPhotos();


        ctrl.goBack = function () {
          $state.go('albums');
        };

        ctrl.showPhoto = function () {

        }

    }]);
