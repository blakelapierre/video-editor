'use strict';

describe('Controller: MovingPartsCtrl', function () {

  // load the controller's module
  beforeEach(module('pulsarClientApp'));

  var MovingPartsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MovingPartsCtrl = $controller('MovingPartsCtrl', {
      $scope: scope
    });
  }));

//   it('should attach a list of awesomeThings to the scope', function () {
//     expect(scope.awesomeThings.length).toBe(3);
//   });
});
