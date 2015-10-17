module.exports = () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    scope: {
      video: '=',
      mode: '='
    },
    controller: ['$scope', $scope => {
      const {video} = $scope;

      console.log({video});

      $scope.$watch('mode', (newValue, oldValue) => {
        console.log({newValue, oldValue});
        if (newValue === 'preview') {
          $scope.hideFilters = true;
          $scope.hidePosition = true;
          $scope.hideTimeline = true;
        }
        else {
          $scope.hideFilters = false;
          $scope.hidePosition = false;
          $scope.hideTimeline = false;
        }
      });
    }]
  };
};