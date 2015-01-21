module.exports = () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {
      element.on('click', event => {
        let el = element[0],
            videoEl = $scope.videoEl,
            position = (event.clientX - el.clientLeft) / el.clientWidth;

        if (videoEl.duration > 0) {
          videoEl.currentTime = position * videoEl.duration;
          $scope.time();
        }

      });

      let lastWheelTime = new Date().getTime();
      element.on('mousewheel', event => {
        let el = element[0],
            videoEl = $scope.videoEl,
            deltaY = event.deltaY,
            swapDirection = $scope.swapDirection > 0 ? -1 : 1,
            time = new Date().getTime(),
            dt = time - lastWheelTime;

        let delta = 0;
        if (deltaY > 0) {
          delta = -0.1 * (1000 / dt);
        }
        else if (deltaY < 0) {
          delta = 0.1 * (1000 / dt);
        }

        lastWheelTime = time;

        if (videoEl.duration > 0) {
          videoEl.currentTime += swapDirection * delta;
          $scope.time();
        }
      });

      $scope.$watch('pinned', event => {
        let pinned = $scope.pinned;

        if (pinned) element.addClass('pinned');
        else element.removeClass('pinned');
      });
    },
    controller: ['$scope', $scope => {
      let videoEl = $scope.videoEl;

      videoEl.addEventListener('timeupdate', event => {
        $scope.time();
      });

      $scope.time = () => {
        $scope.$apply(() => {
          $scope.currentTime = formatTime(videoEl.currentTime);
          $scope.remainingTime = formatTime(videoEl.duration - videoEl.currentTime);
          $scope.currentPercent = 100 * videoEl.currentTime / videoEl.duration;
        });
      };
    }]
  };
};

function formatTime(timeInMilliseconds) {
  let time = timeInMilliseconds,
      hours = Math.floor(time / (60 * 60)),
      minutes = Math.floor((time - (hours * 60 * 60)) / 60),
      seconds = Math.floor(time % 60);

  return (hours > 0 ? (hours + 'h') : '') +
         (minutes < 10 ? '0' + minutes : minutes) + '\'' +
         (seconds < 10 ? '0' + seconds : seconds) + '\'\'';
}