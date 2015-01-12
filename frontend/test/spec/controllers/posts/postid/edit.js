'use strict';

describe('Controller: PostEditCtrl', function () {

  // load the controller's module
  beforeEach(module('pulsarClientApp'));

  var PostEditCtrl;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PostEditCtrl = $controller('PostEditCtrl', {
      $scope: scope
    });
  }));

  //   it('should attach a list of awesomeThings to the scope', function () {
  //     expect(scope.awesomeThings.length).toBe(3);
  //   });
});
