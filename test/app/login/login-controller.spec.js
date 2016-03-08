describe('Controller: LoginCtrl', function () {
  var $controller,
      $rootScope,
      Auth;


  beforeEach(module('app'));

  beforeEach(  inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    Auth = {
      login: function () {
      }
    };
    spyOn(Auth, 'login');
  }));



  it('should be defined', function() {
    var scope,
      controller;
    scope = $rootScope.$new();
    controller = $controller('LoginCtrl', {Auth: Auth, $scope: scope});

    expect(controller).toBeDefined();
  });

  it('.login should call Auth.login ', function() {
    var scope,
      controller;
    scope = $rootScope.$new();
    controller = $controller('LoginCtrl', {Auth: Auth, $scope: scope});

    controller.login();
    expect(Auth.login).toHaveBeenCalledTimes(1);
    controller.login();
    expect(Auth.login).toHaveBeenCalledTimes(2);
  });

});