describe('Controller: PhotosCtrl', function () {
  var $controller,
    $state,
    $scope,
    PhotosModel,
    $stateParams,
    controller;


  beforeEach(module('app'));

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    $state = {
      go: function () {
      }
    };

    $stateParams = {albumId: 123};
    PhotosModel = {
      getAll: function () {

      }
    };

    spyOn($state, 'go');
    spyOn(PhotosModel, 'getAll');;

    controller = $controller('PhotosCtrl', {
      $stateParams: $stateParams,
      PhotosModel: PhotosModel,
      $scope: $scope,
      $state: $state
    });
  }));


  it('should be defined', function () {
    expect(controller).toBeDefined();
  });

  it('.getPhotos should be defined', function () {
    expect(controller.getPhotos).toBeDefined();
  });

  it('.showPhoto should be defined', function () {
    expect(controller.showPhoto).toBeDefined();
  });

  it('$scope.currentPhotoPos initially should be null', function () {
    expect($scope.currentPhotoPos).toBe(null);
  });

  it('$scope.increaseCurrentPhotoPos, should be defined', function () {
    expect($scope.increaseCurrentPhotoPos).toBeDefined();
  });

  it('increaseCurrentPhotoPos should increase position properly', function () {
    expect($scope.currentPhotoPos).toBe(null);
    $scope.photos = [1,2,3,4,5];
    $scope.currentPhotoPos = 0;
    $scope.increaseCurrentPhotoPos();
    expect($scope.currentPhotoPos).toBe(1);
    $scope.currentPhotoPos = 4;
    $scope.increaseCurrentPhotoPos();
    expect($scope.currentPhotoPos).toBe(0);
  });

  it('$scope.decreaseCurrentPhotoPos, should be defined', function () {
    expect($scope.decreaseCurrentPhotoPos).toBeDefined();
  });

  it('decreaseCurrentPhotoPos should increase position properly', function () {
    expect($scope.currentPhotoPos).toBe(null);
    $scope.photos = [1,2,3,4,5];
    $scope.currentPhotoPos = 3;
    $scope.decreaseCurrentPhotoPos();
    expect($scope.currentPhotoPos).toBe(2);
    $scope.currentPhotoPos = 0;
    $scope.decreaseCurrentPhotoPos();
    expect($scope.currentPhotoPos).toBe(4);
  });

  it('$scope.albumId  should be equal to given params', function () {
    expect($scope.lastChoosenAlbumId).toBe(123);
  });

  it('getPhotos should call PhotosModel.getAll', function () {
    PhotosModel.getAll.calls.reset();
    controller.getPhotos();
    expect(PhotosModel.getAll).toHaveBeenCalledTimes(1);
    expect(PhotosModel.getAll.calls.mostRecent().args[0]).toBe(123);
  });

  it('.showPhoto should save position of clicked photo and change state', function () {
    controller.showPhoto(321, 2);
    expect($scope.currentPhotoPos).toBe(2);
    expect($state.go).toHaveBeenCalledTimes(1);
    expect($state.go.calls.mostRecent().args[1].photoID).toBe(321);
  });

  it('tooltip placements should be defined on $scope', function () {
    expect($scope.placement).toBeDefined();
  })

});