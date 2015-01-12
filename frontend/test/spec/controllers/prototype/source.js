'use strict';

describe('Controller: PrototypeSourceCtrl', function () {

  // load the controller's module
  beforeEach(module('pulsarClientApp'));

  var PrototypeSourceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PrototypeSourceCtrl = $controller('PrototypeSourceCtrl', {
      $scope: scope
    });
  }));

//   it('should attach a list of awesomeThings to the scope', function () {
//     expect(scope.awesomeThings.length).toBe(3);
//   });
});
