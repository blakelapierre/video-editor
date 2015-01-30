var _ = require('lodash');

let numThumbnails = 5;

module.exports = ['on', 'off', (on, off) => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {
      let el = element[0],
          thumbnailEl = element.find('video')[0],
          videoEl;

      on(el, {wheel});

      $scope.$watchCollection('thumbnails', () => {
        let thumbnails = $scope.thumbnails,
            canvases = element.find('canvas');

        let offsetAdjustment = thumbnails.length % 2 === 0 ? 1 : 0;
        _.each(_.zip([thumbnails, canvases]), (pair, index) => {
          let thumbnail = pair[0],
              canvas = pair[1],
              context = canvas.getContext('2d');

          canvas.width = canvas.parentNode.clientWidth;
          canvas.height = canvas.width * 9 / 16;

          canvas.style['-webkit-filter'] = $scope.videoElFilterStyle;

          thumbnail.canvas = canvas;
          thumbnail.context = context;
          thumbnail.index = index;

          thumbnail.offset = (index - Math.floor(thumbnails.length / 2)) * 2 + offsetAdjustment;
        });

        if (videoEl) drawThumbnails(videoEl.currentTime);
      });

      $scope.$watch('videoEl', (newEl, oldEl) => {
        videoEl = newEl;

        console.dir(videoEl);

        if (oldEl) {
          off(oldEl, {pause, timeupdate, loadeddata});
        }

        on(videoEl, {pause, timeupdate, loadeddata});

        function pause() {
          drawThumbnails(videoEl.currentTime);
        }

        // This can be called around the same time as pause(), potentially causing problems
        function timeupdate() {
          if (videoEl.paused) drawThumbnails(videoEl.currentTime);
        }

        function loadeddata() {
          drawThumbnails(videoEl.currentTime);
        }
      });

      $scope.$watch('videoElFilterStyle', (newStyle) => {
        if ($scope.thumbnails) {
          _.each($scope.thumbnails, thumbnail => {
            thumbnail.canvas.style['-webkit-filter'] = newStyle;
            thumbnail.canvas.style['filter'] = newStyle;
          });
        }
      });

      $scope.gotoThumbnail = thumbnail => {
        videoEl.currentTime = thumbnail.time;
      };

      $scope.offsetChanged = thumbnail => {
        drawThumbnails(videoEl.currentTime);
      };

      let drawThumbnails = ((thumbnailEl, thumbnails) => {
        let nextIndex = 0;

        thumbnailEl.addEventListener('seeked', seeked);

        return time => {
          let thumbnails = $scope.thumbnails;

          nextIndex = 0;

          _.each(thumbnails, thumbnail => {
            thumbnail.time = time + thumbnail.offset;
            thumbnail.pending = true;
          });

          for (var i = 0; i < thumbnails.length; i++) {
            let t = thumbnails[i];

            if (t.time >= 0) break;

            t.context.clearRect(0, 0, t.canvas.width, t.canvas.height);
          }

          nextIndex = i;

          if (nextIndex < thumbnails.length) {
            thumbnailEl.currentTime = thumbnails[nextIndex].time;
          }
        };

        function seeked() {
          let thumbnail = thumbnails[nextIndex],
              canvas = thumbnail.canvas,
              context = thumbnail.context;

          let vw = thumbnailEl.videoWidth,
              vh = thumbnailEl.videoHeight,
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

          thumbnail.pending = false;

          nextIndex++;
          if (nextIndex < thumbnails.length) {
            let thumbnail = thumbnails[nextIndex];
            thumbnailEl.currentTime = thumbnail.time;
          }

          $scope.$apply();
        }
      })(thumbnailEl, $scope.thumbnails);

      function wheel(event) {
        let deltaY = event.deltaY;

        $scope.$apply(() => {
          if (deltaY > 0) {
            _.each($scope.thumbnails, (thumbnail, index) => {
              thumbnail.offset *= 2;
            });
          }
          else if (deltaY < 0) {
           _.each($scope.thumbnails, (thumbnail, index) => {
              thumbnail.offset /= 2;
            });
          }
          drawThumbnails(videoEl.currentTime);
        });
      }
    },
    controller: ['$scope', ($scope) => {
      $scope.thumbnails = [{},{},{},{},{},{}];

      $scope.insertThumbnail = index => {
        $scope.thumbnails.splice(index, 0, {});
      };

      $scope.removeThumbnail = index => {
        $scope.thumbnails.splice(index, 1);
      };
    }]
  };
}];