module.exports = ['$sce', $sce => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {
      document.addEventListener('paste', event => {
        $scope.receivedPaste(event);
      });
    },
    controller: ['$scope', $scope => {
      $scope.showTeaser = true;
      $scope.video = {src: undefined, success: false};
      $scope.videos = [];

      $scope.receivedPaste = $event => {
        const a = document.createElement('a');

        let text = $event.clipboardData.getData('text/plain');

        console.log({text});
        if (!text.match(/^https?/)) text = `https://${text}`;
        console.log({text});

        a.href = text;

        if (a.host.match(/^(.*\.+)?youtube.com$/i)) {
          console.log('matched');

          const videoID = a.search.match(/v\=(.+)\&?/)[1],
                videoURL = `https://youtube.com/embed/${videoID}?autoplay=1`;

          $scope.$apply(() => {
            $scope.showTeaser = false;
            $scope.mode = 'playback';

            $scope.videos.push({
              external: true,
              loaded: true,
              success: true,
              src: $sce.trustAsResourceUrl(videoURL)
            });
          });
          console.log(videoID);
        }
        console.dir(a);
      };

      $scope.droppedFiles = ($files, $items) => {
        console.log({$files});
        const {length} = $files,
              {videos} = $scope;

        if (length > 0) {
          fillVideos();

          $scope.selected = undefined;
          $scope.showTeaser = false;

          if (length === 1) {
            const [file] = videos,
                  type = file.type;

            if (type.indexOf('video') === 0) {
              $scope.video.src = $sce.trustAsResourceUrl(URL.createObjectURL(file));
              $scope.video.loaded = false;
              $scope.video.error = undefined;

              $scope.mode = 'playback';
            }
          }
          else if (length > 1) {
            $scope.mode = 'preview';
          }
        }
        else {
          $scope.showTeaser  = true;
        }

        function fillVideos() {
          videos.splice(0, videos.length);
          for (var i = 0; i < length; i++) {
            const file = $files[i];

            file.src = $sce.trustAsResourceUrl(URL.createObjectURL(file));
            file.loaded = false;
            file.error = undefined;

            videos[i] = file;
          }
        }
      };
    }]
  };
}];