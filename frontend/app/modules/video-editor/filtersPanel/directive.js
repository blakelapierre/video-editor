let _ = require('lodash');

module.exports = () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    link: ($scope, element, attributes) => {
      let table = element.find('table'),
          tbody = table.find('tbody')

      $scope.$watchCollection('filters', (newValue, oldValue) => {
        let rows = tbody.children();

        _.each(_.zip([rows, newValue]), pair => {
          let [row, filter] = pair;

          row.addEventListener('wheel', event => debouncedApply(wheel(event, filter)));
        });

        function wheel(event, filter) {
          event.stopPropagation();
          event.preventDefault();


          let deltaY = event.deltaY,
              {value, min, max} = filter;

          if (deltaY < 0) {
            filter.value = clamp(value + 1, min, max);
          }
          else if (deltaY > 0) {
            filter.value = clamp(value - 1, min, max);
          }
        }

        function clamp(value, min, max) {
          min = min === undefined ? Number.NEGATIVE_INFINITY : min;
          max = max === undefined ? Number.POSITIVE_INFINITY : max;
          return Math.min(Math.max(min, value), max);
        }
      });

      let debouncedApply = _.debounce(fn => $scope.$apply(fn), 10);
    },
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
        videoEl.style['filter'] = $scope.videoElFilterStyle = style;
      }

      function getFilterStyle() {
        return _.map(filters, filter => {
          let {name, value, unit} = filter;

          if (value != undefined) {
            return name + '(' + value + unit + ')';
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