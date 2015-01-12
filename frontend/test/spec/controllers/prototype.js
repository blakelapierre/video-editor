'use strict';

describe('Controller: PrototypeCtrl', function () {

  // load the controller's module
  beforeEach(module('pulsarClientApp'));

  var PrototypeCtrl;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PrototypeCtrl = $controller('PrototypeCtrl', {
      $scope: scope
    });
  }));

//   it('should attach a list of awesomeThings to the scope', function () {
//     expect(scope.awesomeThings.length).toBe(3);
//   });
});
