'use strict';

describe('Service: viewerService', function () {

  // load the service's module
  beforeEach(module('app'));

  // instantiate service
  var viewerService;
  beforeEach(inject(function (_viewerService_) {
    viewerService = _viewerService_;
  }));

  it('should do something', function () {
    expect(!!viewerService).toBe(true);
  });

});
