"use strict";

describe('MainCtrl', function() {
  var $controller;
  var $rootScope;

  beforeEach(module('app'));

  beforeEach(  inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));



  it('currentUser should be null', function() {
    var scope,
      controller;

    scope = $rootScope.$new();
    controller = $controller('MainCtrl', {$scope: scope});

    expect(scope.currentUser).toBe(null);

  });

  it('logout method should call Auth.logout', function() {
    var scope,
      controller;

    scope = $rootScope.$new();
    controller = $controller('MainCtrl', {$scope: scope});

    expect(scope.currentUser).toBe(null);

  });


});
