'use strict';

angular.module('app')
  .directive('navbar', function () {
    return {
      templateUrl: 'views/navbar.html',
      restrict: 'E',
      controller: 'NavbarCtrl',
      controllerAs: 'nav',
      replace: true
    };
  });
