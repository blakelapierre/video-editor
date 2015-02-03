/*
  Place on an element to allow it to capture drag-and-dropped files.


*/

module.exports = ['$parse', $parse => {

  function processDragOverEnter(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  return {
    restrict: 'A',
    link: function($scope, element, attributes) {
      element.bind('dragover', processDragOverEnter);
      element.bind('dragenter', processDragOverEnter);

      element.bind('drop', function(e) {
        e.preventDefault();

        $parse(attributes.dropArea)($scope, {$files: e.dataTransfer.files, $items: e.dataTransfer.items});

        $scope.$apply();

        return false;
      });
    }
  };
}];