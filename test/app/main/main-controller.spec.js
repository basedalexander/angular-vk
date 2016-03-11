"use strict";

// TODO test $on event listeners

describe('Controller: MainCtrl', function() {
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


});
