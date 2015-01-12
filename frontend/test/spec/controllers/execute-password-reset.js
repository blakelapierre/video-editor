'use strict';

describe('Controller: ExecutePasswordResetCtrl', function () {

  // load the controller's module
  beforeEach(module('pulsarClientApp'));

  var ExecutePasswordResetCtrl;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExecutePasswordResetCtrl = $controller('ExecutePasswordResetCtrl', {
      $scope: scope
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(scope.awesomeThings.length).toBe(3);
  // });
});
