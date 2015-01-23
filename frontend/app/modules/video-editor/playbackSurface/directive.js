module.exports = ['$sce', 'thumbnails', ($sce, thumbnails) => {
  return {
    restrict: 'E',
   // replace: true,
    template: require('./template.html'),
    // scope: {
    //   file: '=',
    //   video: '='
    // },
    link: ($scope, element, attributes) => {
      let videoEl = element.find('video')[0],
          overlayEl = element.find('.overlay')[0],
          video = angular.element(videoEl),
          overlay = angular.element(overlayEl);

      $scope.videoEl = videoEl;

      let lastWheelTime = new Date().getTime();

      video.on('wheel', event => {
        console.log(event);
        let time = new Date().getTime(),
            dt = time - lastWheelTime;

        let delta = 0;
        if (event.deltaY > 0) {
          delta = -0.001 * (1000 / dt);
        }
        else if (event.deltaY < 0) {
          delta = 0.001 * (1000 / dt);
        }

        if (delta !== 0) {
          $scope.$apply(() => $scope.setPlaybackRate(Math.min(5, Math.max(0, videoEl.playbackRate + delta))));
        }

        lastWheelTime = time;
      });

      videoEl.addEventListener('pause', event => {
        thumbnails.publish(videoEl);
      });

      videoEl.addEventListener('paste', event => {
        console.log('paste', event);
      });

      $scope.togglePlay = () => {
        if (videoEl.paused) videoEl.play();
        else videoEl.pause();
      };

      $scope.setPlaybackRate = rate => {
        rate = rate || 1;
        videoEl.playbackRate = rate;
        $scope.playbackRate = rate < 0.001 ? rate.toFixed(5) : rate.toFixed(3);
      };

      $scope.setPlaybackRate(videoEl.playbackRate);
    },
    controller: ['$scope', $scope => {
      $scope.showFilters = true;

      console.log('scope', $scope);

    }]
  };
}];