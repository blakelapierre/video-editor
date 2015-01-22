module.exports = () => {
  return {
    restrict: 'AE',
    template: require('./template.html'),
    scope: {
      ngModel: '=',
      min: '=',
      max: '='
    }
  };
};