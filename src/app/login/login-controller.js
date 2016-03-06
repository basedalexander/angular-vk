'use strict';

angular.module('app')
  .controller('LoginCtrl', function (Auth, $state) {
    var login = this;

    login.login = function () {
      Auth.login();
    };

  });

