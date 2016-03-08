//TODO Test ModalCtrl and ViewerService

describe('Controller: ViewerCtrl', function () {
  var $controller,
    $state,
    $scopeChild,
    $scopeParent,
    ViewerService,
    $stateParams,
    controller;


  beforeEach(module('app'));

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $scopeParent = _$rootScope_.$new();
    $scopeParent.da = 3;
    $scopeChild = $scopeParent.$new();
    $state = {
      go: function () {
      }
    };

    $stateParams = {albumId: 123, photoID: 321};
    ViewerService = {
      open: function () {
      },
      isOpened: false
    };

    spyOn($state, 'go');
    spyOn(ViewerService, 'open');

    controller = $controller('ViewerCtrl', {
      $scope: $scopeChild,
      $stateParams: $stateParams,
      ViewerService: ViewerService
    });
  }));

  it('should be defined', function () {
    expect(controller).toBeDefined();
  });

  it('should call ViewerService.open method depends on his state', function () {
    expect(ViewerService.open).toHaveBeenCalled();
    expect(ViewerService.open.calls.mostRecent().args[0].da).toBe(3);
  });






});