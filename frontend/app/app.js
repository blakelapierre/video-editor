var angular = require('angular');


module.exports = angular.module('base-angular', [])
  .directive('helloWorld', require('./modules/base-angular/helloWorld/directive'))
;