var angular = require('angular');


module.exports = angular.module('base-angular', [])
  .directive('center', require('./modules/base-angular/center/directive'))
  .directive('helloWorld', require('./modules/base-angular/helloWorld/directive'))
  .directive('spinner',    require('./modules/base-angular/spinner/directive'))
;