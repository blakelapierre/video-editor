'use strict';

describe('Service: PresentationEngine', function () {

  // load the service's module
  beforeEach(module('pulsarClientApp'));

  // instantiate service
  var PresentationEngine;
  beforeEach(inject(function (_PresentationEngine_) {
    PresentationEngine = _PresentationEngine_;
  }));

  it('should do something', function () {
    expect(!!PresentationEngine).toBe(true);
  });

});
