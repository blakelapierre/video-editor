module.exports = ['$sce', $sce => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', $scope => {

      $scope.receivedPaste = $event => {
        console.log($event.clipboardData.getData('text/plain'));
      };
    }]
  };
}];