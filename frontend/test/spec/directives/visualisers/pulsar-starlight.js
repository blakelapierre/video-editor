'use strict';

describe('Directive: PulsarStarlightVisualizerDirective', function () {

  // load the directive's module
  beforeEach(module('pulsarClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pulsar:canvas-threejs></pulsar:canvas-threejs>');
    element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the pulsar:canvasThreejs directive');
  }));
});
