module.exports = () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', $scope => {
      $scope.teaserClicked = () => {
        $scope.promptForFile();
      };

      $scope.promptForFile = () => {
        const input = getFileInput();
        input.click();
      };

      let input; // is there a better memoization pattern than this?
      function getFileInput() {
        if (!input) {
          input = document.createElement('input');
          input.type = 'file';
          input.multiple = true;

          angular.element(input).bind('change', event => {
            $scope.$apply(() => {
              $scope.droppedFiles(event.target.files);
            });
          });
        }

        return input;
      }
    }]
  };
};