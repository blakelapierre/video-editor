import _ from 'lodash';

module.exports = ['$sce', ({trustAsResourceUrl}) => {
  const services = {
    'youtube': {
      host: /(.*\.+)?youtube.com$/i,
      urlTransform: a => `https://youtube.com/embed/${a.search.match(/v\=(.+?)&?.*/)[1]}?autoplay=1`,
      paramMap: {
        'v': 'videoID',
        // Currently this does nothing. YT's embed URL scheme doesn't appear to support it
        't': 'time'
      },
      deconstructURL: (a, paramMap) => _.transform(_.map(a.search.substring(1).split('&'), kvp => kvp.split('=')), (params, [key, value]) => params[paramMap[key]] = value),
      constructURL: ({videoID, time}) => `https://youtube.com/embed/${videoID}?autoplay=1${time ? '&t=' + time : ''}`,
      videoConstructor: url => ({
        type: 'youtube',
        external: true,
        loaded: true,
        success: true,
        src: trustAsResourceUrl(url)
      })
    }
  };


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

      $scope.receivedPaste = ({clipboardData}) => {
        const a = createAnchor(clipboardData.getData('text/plain'));

        _.some(services, handlePaste);

        function handlePaste({host, deconstructURL, constructURL, paramMap, videoConstructor}, name) {
          if (a.host.match(host)) {
            $scope.$apply(() => {
              $scope.showTeaser = false;
              $scope.mode = 'playback';

              $scope.videos.push(videoConstructor(constructURL(deconstructURL(a, paramMap))));
            });
          }
        }
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
              $scope.video.src = trustAsResourceUrl(URL.createObjectURL(file));
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

            file.src = trustAsResourceUrl(URL.createObjectURL(file));
            file.loaded = false;
            file.error = undefined;

            videos[i] = file;
          }
        }
      };
    }]
  };
}];

function createAnchor(text) {
  const a = document.createElement('a');
  a.href = text;
  return a;
}