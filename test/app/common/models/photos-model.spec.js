"use strict";

describe('Service: AlbumsModel', function () {
  var PhotosModel;

  beforeEach(module('app.common'));

  beforeEach(inject(function (_PhotosModel_) {
    PhotosModel = _PhotosModel_;
  }));


  it('should be defined', function () {
    expect(PhotosModel).toBeDefined();
  });

  it('.getAll should be defined', function () {
    expect(PhotosModel.getAll).toBeDefined();
  });

});