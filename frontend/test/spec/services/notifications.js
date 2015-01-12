'use strict';

describe('Service: Notifications', function () {

  // load the service's module
  beforeEach(module('pulsarClientApp'));

  // instantiate service
  var Notifications;
  beforeEach(inject(function (_Notifications_) {
    Notifications = _Notifications_;
  }));

  it('should do something', function () {
    expect(!!Notifications).toBe(true);
  });

});
