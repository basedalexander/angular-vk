'use strict';

describe('Service: notesModel', function () {

  // load the service's module
  beforeEach(module('app'));

  // instantiate service
  var notesModel;
  beforeEach(inject(function (_notesModel_) {
    notesModel = _notesModel_;
  }));

  it('should do something', function () {
    expect(!!notesModel).toBe(true);
  });

});
