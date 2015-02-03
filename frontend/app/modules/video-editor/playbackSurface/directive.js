let wheelHandlers = {
  playbackSpeed: (() => {
    let maxPlaybackRate = 100,
        minPlaybackRate = 0.0000001,
        lastWheelTime = new Date().getTime();

    return ($scope, videoEl, event) => {
      let time = new Date().getTime(),
          dt = time - lastWheelTime,
          currentRate = videoEl.playbackRate || minPlaybackRate;

      let delta = 0;
      if (event.deltaY > 0) {
        delta = -0.001 * (1000 / clamp(dt, 1000, 0)) * currentRate;
      }
      else if (event.deltaY < 0) {
        delta = 0.001 * (1000 / clamp(dt, 1000, 0)) * currentRate;
      }

      if (delta !== 0) {
        let newRate = currentRate + delta;
        $scope.$apply(() => $scope.setPlaybackRate(clamp(newRate, maxPlaybackRate, minPlaybackRate)));
      }

      lastWheelTime = time;
    };
  })(),
  zoom: (() => {
    let lastWheelTime = new Date().getTime();

    return ($scope, videoEl, event) => {
      let time = new Date().getTime(),
          dt = time - lastWheelTime,
          currentRate = videoEl.playbackRate || minPlaybackRate;

      let delta = 0;
      if (event.deltaY > 0) {
        delta = -0.001 * (1000 / clamp(dt, 1000, 0)) * currentRate;
      }
      else if (event.deltaY < 0) {
        delta = 0.001 * (1000 / clamp(dt, 1000, 0)) * currentRate;
      }

      if (delta !== 0) {
        let newRate = currentRate + delta;
        $scope.$apply(() => $scope.setPlaybackRate(clamp(newRate, maxPlaybackRate, minPlaybackRate)));
      }

      lastWheelTime = time;
    };
  })()
};

module.exports = [() => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {
      let videoEl = element.find('video')[0],
          overlayEl = element.find('div')[0],
          currentMode = 'playbackSpeed',
          video = angular.element(videoEl),
          overlay = angular.element(overlayEl);

      $scope.videoEl = videoEl;

      videoEl.addEventListener('loadeddata', loadeddata);
      videoEl.addEventListener('loadedmetadata', loadedmetadata);
      videoEl.addEventListener('loadstart', loadstart);
      videoEl.addEventListener('error', error);
      overlayEl.addEventListener('wheel', wheel);

      function loadeddata(event) {
        console.log('loadeddata', event);
        $scope.$apply(() => {
          $scope.video.loaded = true;
        });
      }

      function loadedmetadata(event) {
        console.log('loadedmetadata', event);
      }

      function loadstart(event) {
        $scope.$apply(() => {
          $scope.video.success = true;
          $scope.setPlaybackRate(1);
        });
      }

      function error() {
        $scope.$apply(() => {
          $scope.video.src = undefined;
          $scope.video.success = false;
          $scope.video.error = videoEl.error;
          $scope.video.loaded = false;
          $scope.haveVideo = false;

          console.log($scope);
        });
        console.log('error', arguments);
      }

      function wheel(event) {
        wheelHandlers[currentMode]($scope, videoEl, event);
      }

      $scope.togglePlay = () => {
        if (videoEl.paused) videoEl.play();
        else videoEl.pause();
      };

      $scope.setCurrentTime = time => {
        if (videoEl.duration > 0) videoEl.currentTime = time;
      };

      $scope.incrementCurrentTime = delta => {
        if (videoEl.duration > 0) videoEl.currentTime += delta;
      };

      $scope.setPlaybackRate = rate => {
        if (rate === undefined) rate = 1;

        videoEl.playbackRate = rate;
        if      (rate < 0.0005) rate = rate.toFixed(7);
        else if (rate < 0.005) rate = rate.toFixed(6);
        else if (rate < 0.05) rate = rate.toFixed(5);
        else if (rate < 0.5) rate = rate.toFixed(4);
        else rate = rate.toFixed(3);
        $scope.playbackRate = rate;
      };

      $scope.createMediaElementSource = context => {
        return context.createMediaElementSource(videoEl);
      };

      $scope.setPlaybackRate(videoEl.playbackRate);
    },
    controller: ['$scope', $scope => {
      $scope.showFilters = true;
    }]
  };
}];

function clamp(value, max, min) {
  return Math.min(max, Math.max(min, value));
}