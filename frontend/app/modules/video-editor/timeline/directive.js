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
          let [thumbnail, canvas] = pair,
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

        if (oldEl)   off(oldEl,  {pause, timeupdate, loadeddata});
        if (videoEl) on(videoEl, {pause, timeupdate, loadeddata});

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
          draw();
          triggerNext();
          $scope.$apply();

          function draw() {
            const thumbnail = thumbnails[nextIndex],
                  {canvas, context, time} = thumbnail,
                  {videoWidth: vw, videoHeight: vh, duration} = thumbnailEl,
                  {parentNode: {clientWidth, clientHeight}} = canvas,
                  ratio = vw / vh;

            let {width, height} = canvas;

            if (ratio > 1) {
              width = clientWidth;
              height = width / ratio;
            }
            else {
              height = clientHeight;
              width = height / ratio;
              // width = clientWidth;
              // height = width * ratio;
            }

            canvas.width = width;
            canvas.height = height;

            if (time > duration) {
              context.clearRect(0, 0, width, height);
            }
            else {
              context.drawImage(thumbnailEl, 0, 0, width, height);
            }
            thumbnail.pending = false;
          }

          function triggerNext() {
            nextIndex++;
            if (nextIndex < thumbnails.length) {
              let thumbnail = thumbnails[nextIndex];
              thumbnailEl.currentTime = thumbnail.time;
            }
          }
        }
      })(thumbnailEl, $scope.thumbnails);

      function wheel(event) {
        let {currentTime, duration} = videoEl,
            {deltaY} = event,
            {thumbnails} = $scope,
            [firstThumbnail] = thumbnails,
            lastThumbnail = thumbnails[thumbnails.length - 1];
            // time = videoEl.currentTime,
            // duration = videoEl.duration,
            // deltaY = event.deltaY,
            // thumbnails = $scope.thumbnails,
            // firstThumbnail = thumbnails[0],
            // lastThumbnail = thumbnails[thumbnails.length - 1];

        $scope.$apply(() => {
          if (deltaY > 0) {
            _.each(thumbnails, (thumbnail, index) => {
              thumbnail.offset *= 2;
            });
          }
          else if (deltaY < 0) {
           _.each(thumbnails, (thumbnail, index) => {
              thumbnail.offset /= 2;
            });
          }

          drawThumbnails(currentTime);

          $scope.timelineWidth = clamp(100 * (lastThumbnail.time - firstThumbnail.time) / duration, 0, 100);
          $scope.timelineLeft = clamp(100 * (currentTime + firstThumbnail.offset) / duration, 0, 100);
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

function clamp(value, min, max) {
  min = min === undefined ? Number.NEGATIVE_INFINITY : min;
  max = max === undefined ? Number.POSITIVE_INFINITY : max;
  return Math.min(Math.max(min, value), max);
}