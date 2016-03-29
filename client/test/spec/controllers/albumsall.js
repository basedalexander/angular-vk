'use strict';

describe('Controller: AlbumsAllCtrl', function () {

  // load the controller's module
  beforeEach(module('app'));

  var AlbumsAllCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlbumsAllCtrl = $controller('AlbumsAllCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AlbumsAllCtrl).toBeDefined();
  });
});
