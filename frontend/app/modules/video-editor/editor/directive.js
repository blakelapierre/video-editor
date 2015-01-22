module.exports = ['$sce', $sce => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', $scope => {
      $scope.video = {src: undefined};

      $scope.receivedPaste = $event => {
        console.log($event, $event.clipboardData.getData('text/plain'));
      };

      $scope.editorClicked = () => {
        if (!$scope.file) $scope.promptForFile();
      };


      $scope.promptForFile = () => {
        var input = document.createElement('input');
        input.type = 'file';

        angular.element(input).bind('change', event => {
          $scope.$apply(() => {
            $scope.file = event.target.files[0];
          });
        });

        input.click();
      };
    }]
  };
}];