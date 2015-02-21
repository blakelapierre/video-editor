module.exports = () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: () => {
      console.log('Hello world controller!');
      console.log('hello from es6!');

      (new Promise((resolve, reject) => {
        resolve('done');
      })).then(a => console.log(a));
    }
  };
};