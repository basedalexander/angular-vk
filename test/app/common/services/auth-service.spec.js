xdescribe('Service: Auth', function () {

  var Auth,
    UserModel,
    $rootScope,
    $state,
    $q,
    VK = {
      Auth: {
        getLoginStatus: function () {}
      }
    };

  beforeEach(module('app.common'));

  beforeEach(inject(function(_Auth_, _UserModel_, _$rootScope_, _$q_, _$state_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    $state = _$state_;
    UserModel = _UserModel_;
    Auth = _Auth_;

    UserModel = {
      fetchInfo : function () {}
    };

    spyOn(UserModel, 'fetchInfo');
    spyOn(VK.Auth, 'getLoginStatus');
  }));


  it('Auth should be defined', function () {
    expect(Auth).toBeDefined();
  });

  it('Auth.login should be defined', function () {
    expect(Auth.login).toBeDefined();
  });

  it('Auth.logout should be defined', function () {
    expect(Auth.logout).toBeDefined();
  });

  it('Auth.needAuth should be defined', function () {
    expect(Auth).toBeDefined();
  });

});