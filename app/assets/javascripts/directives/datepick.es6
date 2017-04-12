angular.module('todoListsApp')
  .directive('datepicker', () => {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: (scope, element, attrs, ngModelCtrl) => {
        $(() => {
          $(element).datepick({
            dateFormat:'dd-mm-yyyy',
            onSelect: date => {
              scope.$apply(() => {
                let val = $.datepick.formatDate('yyyy-mm-dd',date[0]);
                ngModelCtrl.$setViewValue(val);
              });
            }
          });
        });
      }
    }
  });
