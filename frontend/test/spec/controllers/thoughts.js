'use strict';

describe('Controller: ThoughtsCtrl', function () {

  // load the controller's module
  beforeEach(module('pulsarClientApp'));

  var ThoughtsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ThoughtsCtrl = $controller('ThoughtsCtrl', {
      $scope: scope
    });
  }));

//   it('should attach a list of awesomeThings to the scope', function () {
//     expect(scope.awesomeThings.length).toBe(3);
//   });
});
