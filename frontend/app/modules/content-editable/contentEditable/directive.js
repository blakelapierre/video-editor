module.exports = ['$sce', '$window', function($sce, $window) {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: ($scope, element, attributes, ngModel) => {
      if (!ngModel) return; // do nothing if no ng-model

      let settings = attempt(() => $scope.$eval(attributes['editableType']), {});


      if (settings) {
        ngModel.$parsers.unshift(transform);
        if (settings.type === 'int') {
          ngModel.$validators.number = (modelValue, viewValue) => {
            return typeof modelValue === 'number';
          };
        }
      }

      element.on('focus', selectText);

      element.on('blur change', () => {
        $scope.$evalAsync(read);
      });

      ngModel.$render = () => {
        element.html($sce.getTrustedHtml(ngModel.$viewValue));
      };

      read();

      function read() {
        let html = element.html(),
            oldValue = ngModel.$viewValue;

        // When we clear the content editable the browser leaves a <br> behind
        // If strip-br attribute is provided then we strip this out
        if (attributes.stripBr && html === '<br>' ) {
          html = '';
        }

        ngModel.$setViewValue(html);

        if (!ngModel.$valid) ngModel.$setViewValue(oldValue);

        ngModel.$render();
      }

      function transform(value) {
        value = parseInt(value, 10);
        return isNaN(value) ? settings.defaultValue : value;
      }

      function selectText() {
        if (document.selection) {
          let range = document.body.createTextRange();
          range.moveToElementText(element[0]);
          range.select();
        }
        else if ($window.getSelection) {
          let selection = $window.getSelection(),
              range = document.createRange();

          range.selectNodeContents(element[0]);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  };
}];

function attempt(fn, defaultValue) {
  let value = defaultValue;
  try {
    value = fn();
  }
  catch (error) {
    value = defaultValue;
  }

  return value;
}
