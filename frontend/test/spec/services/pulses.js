'use strict';

describe('Service: Pulses', function () {

  // load the service's module
  beforeEach(module('pulsarClientApp'));

  // instantiate service
  var Pulses;
  beforeEach(inject(function (_Pulses_) {
    Pulses = _Pulses_;
  }));

  it('should do something', function () {
    expect(!!Pulses).toBe(true);
  });

});
