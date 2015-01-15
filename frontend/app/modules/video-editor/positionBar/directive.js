module.exports = () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {
      element.on('click', event => {
        let el = element[0],
            videoEl = $scope.videoEl,
            position = (event.x - el.clientLeft) / el.clientWidth;

        if (videoEl.duration > 0) {
          videoEl.currentTime = position * videoEl.duration;
          $scope.setCurrentTime();
        }

      });

      element.on('mousewheel', event => {
        let el = element[0],
            videoEl = $scope.videoEl,
            deltaY = event.deltaY;

        if (videoEl.duration > 0) {
          videoEl.currentTime += deltaY / 62;
          $scope.setCurrentTime();
        }
      });
    },
    controller: ['$scope', $scope => {
      console.log('scope', $scope);

      let videoEl = $scope.videoEl;

      videoEl.addEventListener('timeupdate', event => {
        $scope.setCurrentTime();
      });

      $scope.setCurrentTime = () => {
        let time = videoEl.currentTime,
            hours = Math.floor(time / (60 * 60)),
            minutes = Math.floor((time - (hours * 60 * 60)) / 60),
            seconds = Math.floor(time % 60);

        $scope.$apply(() => {
          $scope.currentTime = (hours > 0 ? (hours + '::') : '') +
                               (minutes > 0 ? (minutes + ':') : '') +
                               seconds;
          $scope.currentPercent = 100 * videoEl.currentTime / videoEl.duration;
        });
      };
    }]
  };
};