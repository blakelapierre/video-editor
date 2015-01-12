'use strict';

describe('Controller: DirectivesSoundcloudPlayerCtrl', function () {

  // load the controller's module
  beforeEach(module('pulsarClientApp'));

  var DirectivesSoundcloudPlayerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DirectivesSoundcloudPlayerCtrl = $controller('DirectivesSoundcloudPlayerCtrl', {
      $scope: scope
    });
  }));

//   it('should attach a list of awesomeThings to the scope', function () {
//     expect(scope.awesomeThings.length).toBe(3);
//   });
});
