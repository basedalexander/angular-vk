'use strict';

describe('Service: userModel', function () {

  // load the service's module
  beforeEach(module('12App'));

  // instantiate service
  var userModel;
  beforeEach(inject(function (_userModel_) {
    userModel = _userModel_;
  }));

  it('should do something', function () {
    expect(!!userModel).toBe(true);
  });

});
