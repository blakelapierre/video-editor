'use strict';

describe('Controller: PostsPostReaderCtrl', function () {

  // load the controller's module
  beforeEach(module('pulsarClientApp'));

  var PostsPostReaderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PostsPostReaderCtrl = $controller('PostsPostReaderCtrl', {
      $scope: scope
    });
  }));

//   it('should attach a post to the scope', function () {
//     expect(scope.post).toBeDefined();
//   });
//   it('should attach a blank comment to the scope', function ( ) {
//     expect(scope.comment).toBeDefined();
//   });

});
