require('angular');

module.exports = {
  'base-angular':  angular.module('base-angular', [])
    .directive('center',     require('./directives/center/directive'))
    .directive('helloWorld', require('./directives/helloWorld/directive'))
    .directive('spinner',    require('./directives/spinner/directive'))
};