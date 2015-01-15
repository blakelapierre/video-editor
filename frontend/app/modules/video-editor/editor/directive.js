module.exports = ['$sce', $sce => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', $scope => {

    }]
  };
}];