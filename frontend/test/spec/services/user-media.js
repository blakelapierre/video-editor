'use strict';

describe('Service: UserMedia', function () {

  // load the service's module
  beforeEach(module('pulsarClientApp'));

  // instantiate service
  var UserMedia;
  beforeEach(inject(function (_UserMedia_) {
    UserMedia = _UserMedia_;
  }));

  it('should do something', function () {
    expect(!!UserMedia).toBe(true);
  });

});
