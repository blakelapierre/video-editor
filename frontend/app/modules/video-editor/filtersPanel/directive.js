let _ = require('lodash');

module.exports = () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', $scope => {
      let videoEl;

      _.each(filters, filter => {
        filter.defaultValue = filter.value;
      });

      $scope.filters = filters;

      $scope.$watch('videoEl', newEl => {
        videoEl = newEl;

        applyFilters();
      });

      $scope.reset = event => {
        _.each($scope.filters, filter => {
          filter.value = filter.defaultValue;
        });
      };

      $scope.$watch('filters', () => applyFilters(), true);

      function applyFilters() {
        let style = getFilterStyle();
        videoEl.style['-webkit-filter'] = $scope.videoElFilterStyle = style;
      }

      function getFilterStyle() {
        return _.map(filters, filter => {
          if (filter.value != undefined) {
            return filter.name + '(' + filter.value + filter.unit + ')';
          }
          return '';
        }).join(' ');
      }
    }]
  };
};

let filters = [{
  name: 'contrast',
  value: 100,
  unit: '%',
  min: 0
},{
  name: 'brightness',
  value: 100,
  unit: '%',
  min: 0
},{
  name: 'saturate',
  value: 100,
  unit: '%',
  min: 0
},{
  name: 'opacity',
  value: 100,
  unit: '%',
  min: 0,
  max: 100
},{
  name: 'hue-rotate',
  value: 0,
  unit: 'deg'
},{
  name: 'grayscale',
  value: 0,
  unit: '%',
  min: 0,
  max: 100
},{
  name: 'sepia',
  value: 0,
  unit: '%',
  min: 0
},{
  name: 'invert',
  value: 0,
  unit: '%',
  min: 0,
  max: 100
},{
  name: 'blur',
  value: 0,
  unit: 'px',
  min: 0
},{
  name: 'drop-shadow'
}];