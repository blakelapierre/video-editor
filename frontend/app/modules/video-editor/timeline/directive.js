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

      let drawThumbnails = ((thumbnailEl, thumbnails) => {
        let nextIndex = 0;

        thumbnailEl.addEventListener('seeked', seeked);

        return () => {
          let thumbnails = $scope.thumbnails,
              time = videoEl.currentTime;

          nextIndex = 0;

          _.each(thumbnails, (thumbnail, index) => {
            thumbnail.time = time + thumbnail.offset;
          });


          for (var i = 0; i < thumbnails.length; i++) {
            let t = thumbnails[i];
            if (t.time >= 0) break;
            t.context.clearRect(0, 0, t.canvas.width, t.canvas.height);
          }

          nextIndex = i;

          if (nextIndex < thumbnails.length) thumbnailEl.currentTime = thumbnails[nextIndex].time;
        };

        function seeked(event) {
          let thumbnail = thumbnails[nextIndex],
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

          if (thumbnail.time > thumbnailEl.duration) {
            context.clearRect(0, 0, canvas.width, canvas.height);
          }
          else {
            context.drawImage(thumbnailEl, 0, 0, canvas.width, canvas.height);
          }

          nextIndex++;
          if (nextIndex < thumbnails.length) {
            let thumbnail = thumbnails[nextIndex];
            thumbnailEl.currentTime = thumbnail.time;
          }
        }
      })(thumbnailEl, $scope.thumbnails);
    },
    controller: ['$scope', ($scope) => {
      $scope.thumbnails = [{},{},{},{},{},{},{},{},{},{},{},{},{}];
    }]
  };
}];