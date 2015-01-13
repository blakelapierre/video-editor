'use strict';

module.exports = () => {
  return {
    restrict: 'A',
    link: ($scope, element, attributes) => {
      element.addClass('spinner');
    }
  };
};