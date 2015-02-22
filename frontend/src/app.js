require('angular'); // Don't assign result...angular/browserify doesn't like it...

module.exports = {
  'base-angular': angular.module('base-angular', [])
    .directive('center', require('./modules/base-angular/center/directive'))
    .directive('helloWorld', require('./modules/base-angular/helloWorld/directive'))
    .directive('spinner',    require('./modules/base-angular/spinner/directive'))

  // 'base-angular': define('base-angular', [], {
  //   directives: [
  //     'center',
  //     'helloWorld',
  //     'spinner'
  //   ]
  // })
};

// function define(name, dependencies, components) {
//   const module = angular.module(name, dependencies),
//         {directives} = components;

//   directives.forEach(directive => {
//     console.log(directive);
//     module.directive(directive, require(`./modules/${name}/${directive}/directive`));
//   });

//   return module;
// }