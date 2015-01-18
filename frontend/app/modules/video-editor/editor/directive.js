module.exports = ['$sce', $sce => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', $scope => {
      $scope.video = {src: undefined};

      $scope.receivedPaste = $event => {
        console.log($event.clipboardData.getData('text/plain'));
      };
    }]
  };
}];