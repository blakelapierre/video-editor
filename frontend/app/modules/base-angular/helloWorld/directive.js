'use strict';

module.exports = function() {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: function() {
      console.log('Hello world controller!');
    }
  };
};