module.exports = ['$sce', $sce => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', $scope => {
      $scope.video = {src: undefined};
      $scope.files = [];

      $scope.receivedPaste = $event => {
        console.log($event, $event.clipboardData.getData('text/plain'));
      };

      $scope.droppedFiles = function($files, $items) {
        let file = $files[0];

        if (file) {
          let type = file.type;

          if (type.indexOf('video') === 0) {
            $scope.video.src = $sce.trustAsResourceUrl(URL.createObjectURL(file));
          }
        }
      };
    }]
  };
}];