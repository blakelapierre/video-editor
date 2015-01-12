'use strict';

describe('Service: SiteSettings', function () {

  // load the service's module
  beforeEach(module('pulsarClientApp'));

  // instantiate service
  var SiteSettings;
  beforeEach(inject(function (_SiteSettings_) {
    SiteSettings = _SiteSettings_;
  }));

  it('should do something', function () {
    expect(!!SiteSettings).toBe(true);
  });

});
