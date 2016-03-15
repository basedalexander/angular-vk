'use strict';

angular.module('app')
  .directive('comparePassword', function () {

    var linker = function (scope, element, attrs, ngModelCtrl) {

      console.log(scope);

      function compare (value) {
        var valid = (value === scope.$eval("password"));

        ngModelCtrl.$setValidity('equal', valid);

        return valid ? value : undefined;

      }

      ngModelCtrl.$parsers.push(compare);
      ngModelCtrl.$formatters.push(compare);

      scope.$watch(attrs.comparePassword, function () {
        compare(ngModelCtrl.$viewValue);
      });
    };


    return {
      require: 'ngModel',
      //restrict: 'A',
      link: linker
    };
  });
