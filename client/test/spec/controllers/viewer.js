'use strict';

describe('Controller: ViewerCtrl', function () {

  // load the controller's module
  beforeEach(module('app'));

  var ViewerCtrl,
    scope;

   //Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewerCtrl = $controller('ViewerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should work', function () {
    expect(ViewerCtrl).toBeDefined();
  });
});
