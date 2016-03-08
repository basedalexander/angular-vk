"use strict";

describe('Service: AlbumsModel', function () {
  var AlbumsModel;

  beforeEach(module('app.common'));

  beforeEach(inject(function (_AlbumsModel_) {
    AlbumsModel = _AlbumsModel_;
  }));


  it('should be defined', function () {
    expect(AlbumsModel).toBeDefined();
  });

  it('.getAll should be defined', function () {
    expect(AlbumsModel.getAll).toBeDefined();
  });


  it('.getById should be defined', function () {
    expect(AlbumsModel.getById).toBeDefined();
  });
});