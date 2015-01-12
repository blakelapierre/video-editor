'use strict';

describe('Controller: AnnouncementsCtrl', function () {

  // load the controller's module
  beforeEach(module('pulsarClientApp'));

  var AnnouncementsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AnnouncementsCtrl = $controller('AnnouncementsCtrl', {
      $scope: scope
    });
  }));

//   it('should attach a list of awesomeThings to the scope', function () {
//     expect(scope.awesomeThings.length).toBe(3);
//   });
});
