module.exports = () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', $scope => {
      $scope.teaserClicked = () => {
        if ($scope.files.length === 0) $scope.promptForFile();
      };

      $scope.promptForFile = () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;

        angular.element(input).bind('change', event => {
          $scope.$apply(() => {
            $scope.droppedFiles(event.target.files);
          });
        });

        input.click();
      };
    }]
  };
};