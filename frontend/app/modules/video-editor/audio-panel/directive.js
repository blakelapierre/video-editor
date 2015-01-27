let AudioContext = window.AudioContext || window.webkitAudioContext,
    requestAnimationFrame = window.requestAnimationFrame;

module.exports = () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {
      let canvas = element.find('canvas')[0],
          canvasContext = canvas.getContext('2d'),
          WIDTH = canvas.width,
          HEIGHT = canvas.height;

      let audioContext = new AudioContext(),
          videoEl;

      $scope.$watch('videoEl', newEl => {
        videoEl = newEl;
        console.log('videoEl', videoEl);

        let audioSource = $scope.createMediaElementSource(audioContext);

        let analyser = audioContext.createAnalyser();

        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);

        videoEl.addEventListener('play', visualize);

        function visualize() {
          console.log('visualizing', analyser);
          analyser.fftSize = 2048;

          let bufferLength = analyser.fftSize,
              dataArray = new Uint8Array(bufferLength);

          canvasContext.clearRect(0, 0, WIDTH, HEIGHT);
          requestAnimationFrame(drawWaveform);

          function drawWaveform() {
            if (!videoEl.paused) requestAnimationFrame(drawWaveform);

            analyser.getByteTimeDomainData(dataArray);

            canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

            canvasContext.lineWidth = 1;
            canvasContext.strokeStyle = 'rgb(0, 0, 0)';

            canvasContext.beginPath();

            canvasContext.moveTo(0, dataArray[0] / 128 * HEIGHT / 2);

            let sliceWidth = WIDTH / bufferLength,
                x = sliceWidth;
            for (var i = 1; i < bufferLength; i++) {
              let v = dataArray[i] / 128.0,
                  y = v * HEIGHT / 2;

              canvasContext.lineTo(x, y);

              x += sliceWidth;
            }

            canvasContext.lineTo(canvas.width, canvas.height / 2);
            canvasContext.stroke();


          }
        }

        // let filter = audioContext.createBiquadFilter();

        // audioSource.connect(filter);
        // filter.connect(audioContext.destination);
      });
    }
  };
};