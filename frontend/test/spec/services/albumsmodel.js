'use strict';

describe('Service: albumsModel', function () {

  // load the service's module
  beforeEach(module('app'));

  // instantiate service
  var albumsModel;
  beforeEach(inject(function (_albumsModel_) {
    albumsModel = _albumsModel_;
  }));

  it('should do something', function () {
    expect(!!albumsModel).toBe(true);
  });

});
