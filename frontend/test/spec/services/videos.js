'use strict';

describe('Service: Videos', function () {

  // load the service's module
  beforeEach(module('pulsarClientApp'));

  // instantiate service
  var Videos;
  beforeEach(inject(function (_Videos_) {
    Videos = _Videos_;
  }));

  it('should do something', function () {
    expect(!!Videos).toBe(true);
  });

});
