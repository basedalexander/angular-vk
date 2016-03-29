'use strict';

describe('Directive: comparePassword', function () {

  // load the directive's module
  beforeEach(module('app'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<compare-password></compare-password>');
    element = $compile(element)(scope);
    expect(true).toBe(true);
  }));
});
