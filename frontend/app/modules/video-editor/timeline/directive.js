var _ = require('lodash');

let numThumbnails = 5;

module.exports = ['thumbnails', thumbnails => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {
      setTimeout(() => {
        let thumbnails = $scope.thumbnails,
            canvases = element.find('canvas');

        _.each(_.zip([thumbnails, canvases]), pair => {
          let thumbnail = pair[0],
              canvas = pair[1],
              context = canvas.getContext('2d');

          canvas.width = canvas.parentNode.clientWidth;
          canvas.height = canvas.width * 9 / 16;

          thumbnail.canvas = canvas;
          thumbnail.context = context;

          console.log(thumbnail.context);
        });

        let videoEl = $scope.videoEl;

        videoEl.addEventListener('pause', event => {
          drawThumbnails();
        });

        videoEl.addEventListener('timeupdate', event => {
          if (videoEl.paused) drawThumbnails();
          else drawThumbnails();
        });

        $scope.gotoThumbnail = thumbnail => {
          videoEl.currentTime = thumbnail.time;
        };

        function drawThumbnails() {
          _.each(thumbnails, thumbnail => {
            let canvas = thumbnail.canvas,
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

            thumbnail.time = videoEl.currentTime;

            context.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
          });
        }
      }, 0);
    },
    controller: ['$scope', ($scope) => {
      $scope.thumbnails = thumbnails(numThumbnails);

    }]
  };
}];