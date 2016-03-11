"use strict";

// TODO test $on event listeners

describe('Controller: HeaderCtrl', function() {
  var $controller;
  var $rootScope,
    Auth;

  beforeEach(module('app'));

  beforeEach(  inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    Auth = {
      logout: function () {
      }
    };

    spyOn(Auth, 'logout');
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
    controller = $controller('MainCtrl', {$scope: scope, Auth: Auth});

    controller.logout();
    expect(Auth.logout).toHaveBeenCalledTimes(1);
  });
});
