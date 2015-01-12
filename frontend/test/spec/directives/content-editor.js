'use strict';

describe('Directive: contenteditable', function () {

  // load the directive's module
  beforeEach(module('pulsarClientApp'));

  //var element;
  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // it('should make hidden element visible', inject(function ($compile) {
  //   element = angular.element('<div contenteditable></div>');
  //   element = $compile(element)(scope);
  //   expect(element.text()).toBe('this is the contentEditor directive');
  // }));
});
