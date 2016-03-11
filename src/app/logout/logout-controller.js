'use strict';

angular.module('app')
  .controller('LogoutCtrl', ['Auth', '$state',  function (Auth, $state) {
    Auth.logout();
    $state.go('login');
  }]);
