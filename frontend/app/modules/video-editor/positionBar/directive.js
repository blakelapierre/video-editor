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

      element.on('mousewheel', event => {
        let el = element[0],
            videoEl = $scope.videoEl,
            deltaY = event.deltaY,
            swapDirection = $scope.swapDirection ? -1 : 1;

        if (videoEl.duration > 0) {
          videoEl.currentTime += -swapDirection * deltaY / 62;
          $scope.time();
        }
      });

      $scope.$watch('pinned', event => {
        console.log(event);
        let pinned = $scope.pinned;

        if (pinned) element.addClass('pinned');
        else element.removeClass('pinned');
      });
    },
    controller: ['$scope', $scope => {
      console.log('scope', $scope);

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

  return (hours > 0 ? (hours + '::') : '') +
         (minutes < 10 ? '0' + minutes : minutes) + ':' +
         (seconds < 10 ? '0' + seconds : seconds);
}