const wheelHandlers = {
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

module.exports = () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {
      console.log({video: $scope.video});
      console.log(element.find('video'));
      let videoEl = element.find('video')[0],
          // iframeEl = element.find('iframe')[0],
          overlayEl = element.find('div')[0],
          currentMode = 'playbackSpeed',
          video = angular.element(videoEl),
          overlay = angular.element(overlayEl);

      $scope.videoEl = videoEl;
      // $scope.iframeEl = document.getElementsByTagName('iframe')[0];
      console.log('got iframe ', $scope.iframeEl);

      videoEl.addEventListener('loadeddata', loadeddata);
      videoEl.addEventListener('loadedmetadata', loadedmetadata);
      videoEl.addEventListener('loadstart', loadstart);
      videoEl.addEventListener('error', error);
      overlayEl.addEventListener('wheel', wheel);

      function loadeddata(event) {
        $scope.$apply(() => {
          $scope.video.loaded = true;
        });
      }

      function loadedmetadata(event) {
        $scope.$apply(() => {
          $scope.video.success = true;
          $scope.setPlaybackRate(1);
        });
      }

      function loadstart(event) {

      }

      function error() {
        const {error} = videoEl;
        console.log({error});
        $scope.$apply(() => {
          const {video} = $scope;

          video.src = undefined;
          video.success = false;
          video.loaded = false;
          video.error = error;

          switch (error.code) {
            case 4:
              video.errorMessage = 'Your browser does not support this video!';
          }
        });
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
        $scope.video.playbackRate = rate;
      };

      $scope.createMediaElementSource = context => {
        return context.createMediaElementSource(videoEl);
      };

      $scope.setPlaybackRate(videoEl.playbackRate);
    },
    controller: ['$scope', $scope => {

    }]
  };
};

function clamp(value, max, min) {
  return Math.min(max, Math.max(min, value));
}