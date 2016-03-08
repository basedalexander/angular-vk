describe('Controller: AlbumsAllCtrl', function () {
  var $controller,
    $state,
    $scope,
    AlbumsModel = {
      getAll: function () {}
    },
    controller;


  beforeEach(module('app'));

  beforeEach(  inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    $state = {
      go: function () {}
    };

    spyOn($state, 'go');
    spyOn(AlbumsModel, 'getAll');

    controller = $controller('AlbumsAllCtrl', {$state: $state, AlbumsModel: AlbumsModel, $scope : $scope});
  }));



  it('should be defined', function() {
    expect(controller).toBeDefined();
  });

  it('.getAlbums method should be defined', function() {
    expect(controller.getAlbums).toBeDefined();
  });

  it('.showAlbum method should be defined', function() {
    expect(controller.showAlbum).toBeDefined();
  });

  it('.showAlbum method should be defined', function() {
    expect(controller.showAlbum).toBeDefined();
  });

  it('$scope.albums should be null', function() {
    expect($scope.albums).toBe(null);
  });

  it('getAlbums should call AlbumsModel"s method', function() {
    AlbumsModel.getAll.calls.reset();
    expect(AlbumsModel.getAll).not.toHaveBeenCalled();

    controller.getAlbums();
    expect(AlbumsModel.getAll).toHaveBeenCalledTimes(1);
  });

  it('showAlbum method should change state', function() {
    controller.showAlbum(123);
    expect($state.go).toHaveBeenCalledTimes(1);
    expect($state.go.calls.mostRecent().args[0]).toBe('albums.photos');
    expect($state.go.calls.mostRecent().args[1].albumId).toBe(123);
  });

});