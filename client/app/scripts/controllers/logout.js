'use strict';

angular.module('app')
  .controller('LogoutCtrl', function (auth) {
    auth.logout();
  });
