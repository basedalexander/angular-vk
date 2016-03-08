"use strict";

describe('Service: UserModel', function () {
  var UserModel;

  beforeEach(module('app.common'));

  beforeEach(inject(function (_UserModel_) {
    UserModel = _UserModel_;
  }));


  it('should be defined', function () {
    expect(UserModel).toBeDefined();
  });

  it('.getCurrentUser should be defined', function () {
    expect(UserModel.getCurrentUser).toBeDefined();
  });

  it('.setCurrentUser should be defined', function () {
    expect(UserModel.setCurrentUser).toBeDefined();
  });

  it('.fetchInfo should be defined', function () {
    expect(UserModel.fetchInfo).toBeDefined();
  });

  it('.getId should be defined', function () {
    expect(UserModel.getId).toBeDefined();
  });

  it('.getCurrentUser should return null', function () {
    expect(UserModel.getCurrentUser()).toBe(null);
  });

  it('.setCurrentUser should work', function () {
    UserModel.setCurrentUser({name: 'Vasya'});
    expect(UserModel.getCurrentUser().name).toBe('Vasya');
  });

  it('.getId should return user/s id', function () {
    UserModel.setCurrentUser({name: 'Vasya', uid: 223});
    expect(UserModel.getId()).toBe(223);
  });


});