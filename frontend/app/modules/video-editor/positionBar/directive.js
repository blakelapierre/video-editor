let _ = require('lodash');

module.exports = ['on', (on) => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {
      let el = element[0];

      on(el, {mousedown, mouseup, mousemove, wheel});

      // Need a better way to put this in the markup
      $scope.$watch('pinned', pinned => {
        if (pinned) element.addClass('pinned');
        else element.removeClass('pinned');
      });

      let button = 0;
      function mousedown(event) {
        if (event.button === 0) {
          button++;
          seekToBarPosition(event);
        }
      }

      function mouseup(event) {
        if (event.button === 0) {
          button--;
        }
      }

      function mousemove(event) {
        if (button > 0) {
          seekToBarPosition(event);
        }
      }

      let lastWheelTime = new Date().getTime();
      function wheel(event) {
        let videoEl = $scope.videoEl,
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

        $scope.incrementCurrentTime(swapDirection * delta);
        $scope.updateBar(videoEl.currentTime);
      }

      function seekToBarPosition(event) {
        let videoEl = $scope.videoEl,
            position = event.clientX / (el.clientLeft + el.clientWidth);

        setCurrentTime(position * videoEl.duration);
      }

      function setCurrentTime(time) {
        $scope.setCurrentTime(time);
        $scope.updateBar(time);
      }
    },
    controller: ['$scope', $scope => {
      let videoEl = $scope.videoEl,
          currentTime;

      $scope.updateBar = time => {
        if (time !== currentTime) {
          currentTime = time;
          $scope.$apply(() => {
            let duration = videoEl.duration,
                thumbnails= $scope.thumbnails,
                firstThumbnail = thumbnails[0],
                lastThumbnail = thumbnails[thumbnails.length - 1];

            $scope.currentTime = formatTime(time);
            $scope.remainingTime = formatTime(duration - time);
            $scope.currentPercent = 100 * (time / duration);
            $scope.timelineWidth = 100 * (lastThumbnail.time - firstThumbnail.time) / duration;
            $scope.timelineLeft = 100 * (time + firstThumbnail.offset) / duration;
          });
        }
      };

      videoEl.addEventListener('timeupdate', () => $scope.updateBar(videoEl.currentTime));
      videoEl.addEventListener('loadeddata', () => $scope.updateBar(videoEl.currentTime));
    }]
  };
}];

function formatTime(timeInSeconds) {
  let time = timeInSeconds,
      hours = Math.floor(time / (60 * 60)),
      minutes = Math.floor((time - (hours * 60 * 60)) / 60),
      seconds = Math.floor(time % 60),
      milliseconds = Math.floor(time * 10 % 10);

  return (hours > 0 ? (hours + 'h') : '') +
         (minutes < 10 ? '0' + minutes : minutes) + '\'' +
         (seconds < 10 ? '0' + seconds : seconds) + '\'\'' +
         milliseconds;
}