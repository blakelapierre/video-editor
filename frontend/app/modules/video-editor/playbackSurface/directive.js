module.exports = ['$sce', 'thumbnails', ($sce, thumbnails) => {
  return {
    restrict: 'E',
   // replace: true,
    template: require('./template.html'),
    scope: {
      file: '='
    },
    link: ($scope, element, attributes) => {
      let videoEl = element.find('video')[0],
          video = angular.element(videoEl);

      $scope.$parent.videoEl = videoEl;
      console.log($scope);

      console.dir(videoEl);

      let playbackVelocity = 0,
          lastWheelTime = new Date().getTime();

      video.on('wheel', event => {
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
          $scope.setPlaybackRate(Math.min(5, Math.max(0, videoEl.playbackRate + delta)));
        }

        lastWheelTime = time;
      });

      videoEl.addEventListener('pause', event => {
        thumbnails.publish(videoEl);
      });

      console.log('keypress');
      element.on('keypress', event => {
        console.log(event);
      });

      $scope.togglePlay = () => {
        if (videoEl.paused) videoEl.play();
        else videoEl.pause();
      };

      $scope.playbackRate = videoEl.playbackRate;
      $scope.setPlaybackRate = rate => {
        videoEl.playbackRate = rate;
        if (rate > 1) $scope.playbackRate = rate + ' : 1';
        else if (rate < 1) $scope.playbackRate = '1 : ' + (1/rate);
        else $scope.playbackRate = '1 : 1';
        $scope.$apply();
      };
    },
    controller: ['$scope', $scope => {

      $scope.$watch('file', () => {
        // console.log('watch', $scope.file);
        let file = $scope.file;

        if (file) {
          let type = file.type;

          if (type.indexOf('video') === 0) {
            $scope.videoSrc = $sce.trustAsResourceUrl(URL.createObjectURL(file));
          }
        }
      });
    }]
  };
}];