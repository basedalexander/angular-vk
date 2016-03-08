describe('Controller: AlbumsCtrl', function () {
  var $controller,
    $state,
    $scope,
    controller;


  beforeEach(module('app'));

  beforeEach(  inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    $state = {
      go: function () {}
    };

    spyOn($state, 'go');

    controller = $controller('AlbumsCtrl', {$state: $state, $scope: $scope});
  }));



  it('should be defined', function() {
      expect(controller).toBeDefined();
  });

  it('$scope.currentAlbum should be null', function() {
    expect($scope.currentAlbum).toBe(null);
  });

  it('.goAllPhotos method should clear currentAlbum and change state', function() {
    $scope.currentAlbum = 123;

    controller.goAllPhotos();

    expect($scope.currentAlbum).toBe(null);
    expect($state.go).toHaveBeenCalledTimes(1);
  });
});