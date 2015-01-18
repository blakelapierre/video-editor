var _ = require('lodash');

let numThumbnails = 5;

module.exports = [() => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {
      let thumbnailEl = element.find('video')[0],
          videoEl;

      $scope.$watchCollection('thumbnails', () => {
        let thumbnails = $scope.thumbnails,
            canvases = element.find('canvas');

        _.each(_.zip([thumbnails, canvases]), (pair, index) => {
          let thumbnail = pair[0],
              canvas = pair[1],
              context = canvas.getContext('2d');

          canvas.width = canvas.parentNode.clientWidth;
          canvas.height = canvas.width * 9 / 16;

          thumbnail.canvas = canvas;
          thumbnail.context = context;
          thumbnail.index = index;

          thumbnail.offset = (index - Math.floor(thumbnails.length / 2)) * 2;

          console.log(thumbnail);
        });
      });

      $scope.$watch('videoEl', () => {
        videoEl = $scope.videoEl;

        videoEl.addEventListener('pause', event => {
          drawThumbnails();
        });

        videoEl.addEventListener('timeupdate', event => {
          if (videoEl.paused) drawThumbnails();
        });
      });

      $scope.gotoThumbnail = thumbnail => {
        videoEl.currentTime = thumbnail.time;
      };

      let nextIndex = 0;
      function drawThumbnails() {
        let time = videoEl.currentTime;

        nextIndex = 0;

        _.each($scope.thumbnails, (thumbnail, index) => {
          thumbnail.time = time + thumbnail.offset;
        });

        thumbnailEl.currentTime = videoEl.currentTime;
      }

      thumbnailEl.addEventListener('seeked', event => {
        let thumbnails = $scope.thumbnails,
            thumbnail = thumbnails[nextIndex],
            canvas = thumbnail.canvas,
            context = thumbnail.context;

        let vw = videoEl.videoWidth,
            vh = videoEl.videoHeight,
            ratio = vw / vh;

        if (ratio > 1) {
          canvas.width = canvas.parentNode.clientWidth;
          canvas.height = canvas.width / ratio;
        }
        else {
          canvas.height = canvas.parentNode.clientHeight;
          canvas.width = canvas.height * ratio;
        }

        context.drawImage(thumbnailEl, 0, 0, canvas.width, canvas.height);

        nextIndex++;
        if (nextIndex < thumbnails.length) {
          let thumbnail = thumbnails[nextIndex];
          thumbnailEl.currentTime = thumbnail.time;
        }
      });
    },
    controller: ['$scope', ($scope) => {
      $scope.thumbnails = [{},{},{},{},{},{},{},{},{},{},{},{},{}];
    }]
  };
}];