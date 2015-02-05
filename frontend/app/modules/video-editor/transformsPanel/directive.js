module.exports = () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', '$$rAF', ($scope, $$rAF) => {
      let currentTransforms = {},
          videoEl;

      $scope.$watch('videoEl', newEl => {
        videoEl = newEl;

        applyTransformStyles();
      });

      let currentTransform = false,
          lastUpdate,
          cancel;
      $scope.mouseDown = which => {
        currentTransform = transforms[which];
        lastUpdate = new Date().getTime();
        cancel = $$rAF(processCurrentTransform);
      };

      $scope.mouseUp = which => {
        currentTransform = false;
        cancel();
      };

      function processCurrentTransform() {
        const time = new Date().getTime(),
              dt = time - lastUpdate;

        // Wow, this naming is horrible!
        const transform = currentTransforms[currentTransform.transform] = currentTransforms[currentTransform.transform] || {value: 0, unit: currentTransform.unit};

        transform.value += currentTransform.rate * (dt / 1000);
        applyTransformStyles();

        lastUpdate = time;
        cancel = $$rAF(processCurrentTransform);
      }

      function applyTransformStyles() {
        const style = getTransformStyle();

        videoEl.style['transform'] = style;
        videoEl.style['-webkit-transform'] = style;
        videoEl.style['-moz-transform'] = style;
        videoEl.style['-ms-transform'] = style;
      }

      function getTransformStyle() {
        return _.map(currentTransforms, (transform, name) => {
          const {value, unit} = transform;

          if (value != undefined) {
            return name + '(' + value + unit + ')';
          }
          return '';
        }).join(' ');
      }
    }]
  };
};

const transforms = {
  up: {
    transform: 'translateY',
    rate: -10, // Units/second
    unit: '%'
  },
  down: {
    transform: 'translateY',
    rate: 10,
    unit: '%'
  },
  left: {
    transform: 'translateX',
    rate: -10,
    unit: '%'
  },
  right: {
    transform: 'translateX',
    rate: 10,
    unit: '%'
  },
  in: {
    transform: 'translateZ',
    rate: 100,
    unit: 'px'
  },
  out: {
    transform: 'translateZ',
    rate: -100,
    unit: 'px'
  }
};