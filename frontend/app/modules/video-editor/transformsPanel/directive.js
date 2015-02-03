module.exports = () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {

    },
    controller: ['$scope', $scope => {
      let currentTransforms = {},
          videoEl;

      $scope.$watch('videoEl', newEl => {
        videoEl = newEl;

        applyTransformStyles();
      });

      $scope.panUp = () => {
        const transform = currentTransforms['translateY'] = currentTransforms['translateY'] || {value: 0, unit: 'px'};
        transform.value -= 1;

        applyTransformStyles();
      };

      $scope.panDown = () => {
        const transform = currentTransforms['translateY'] = currentTransforms['translateY'] || {value: 0, unit: 'px'};
        transform.value += 1;

        applyTransformStyles();
      };

      $scope.panLeft = () => {
        const transform = currentTransforms['translateX'] = currentTransforms['translateX'] || {value: 0, unit: 'px'};
        transform.value -= 1;

        applyTransformStyles();
      };

      $scope.panRight = () => {
        const transform = currentTransforms['translateX'] = currentTransforms['translateX'] || {value: 0, unit: 'px'};
        transform.value += 1;

        applyTransformStyles();
      };

      $scope.zoomIn = () => {
        const transform = currentTransforms['translateZ'] = currentTransforms['translateZ'] || {value: 0, unit: 'px'};
        transform.value -= 1;

        applyTransformStyles();
      };

      $scope.zoomOut = () => {
        const transform = currentTransforms['translateZ'] = currentTransforms['translateZ'] || {value: 0, unit: 'px'};
        transform.value -= 1;

        applyTransformStyles();
      };

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
  translateX: {

  },
  translateY: {

  },
  translateZ: {

  }
};