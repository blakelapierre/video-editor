'use strict';

describe('Directive: pulsarPulse', function () {

  // load the directive's module
  beforeEach(module('pulsarClientApp'));

  //var element;
  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

//   it('should make hidden element visible', inject(function ($compile) {
//     element = angular.element('<pulsar-pulse></pulsar-pulse>');
//     element = $compile(element)(scope);
//     expect(element.text()).toBe('this is the pulsarPulse directive');
//   }));
});
