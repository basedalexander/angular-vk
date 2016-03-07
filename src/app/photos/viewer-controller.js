angular.module('app')
.controller('ViewerCtrl', function ($scope, $uibModal, $log, $stateParams, $state, $rootScope) {

  console.log('stateParams are : ' , $stateParams);


  // In case of hard reloading on this state
  if ($scope.$parent.currentPhotoPos === null) {
    console.log('lox!');
    VK.Api.call('photos.get', { album_id: $stateParams.albumId}, function (res) {
      console.log(res);

      for (var i = 0; i < res.response.length; i++) {
        if (res.response[i].pid === +$stateParams.photoID) {
          console.log('found!', i);
          $scope.$parent.currentPhotoPos = i;
          $scope.$parent.$apply();
        }
      }
    });
  }



  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      scope: $scope.$parent,
      size: size,
      resolve: {
        parent: function () {
          return $scope.$parent;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $state.go('albums.photos', {
        albumId: $scope.$parent.lastChoosenAlbumId
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
    .controller('ModalInstanceCtrl', function ($scope, $state, $uibModalInstance, $rootScope) {

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

     }

     $scope.prev = function () {
       var currPos = $scope.$parent.currentPhotoPos;
       var len = $scope.$parent.photos.length;

       if (currPos > 0) {
         $scope.$parent.currentPhotoPos--;
       } else {
         $scope.$parent.currentPhotoPos = len - 1;
       }
     }

  $scope.ok = function () {
    $uibModalInstance.close();
    console.log('OK');
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
    $state.go('albums.photos', {
      albumId: $scope.$parent.lastChoosenAlbumId
    })
  };
});
