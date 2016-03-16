'use strict';

angular.module('app')
  .service('auth', function ($http, authToken, API_URL) {


    this.register = function (email, password) {
      var user = {
        email: email,
        password: password
      };

      $http.post(API_URL + 'register', user)
        .success(function () {
          console.log('success');
        })
        .error(function () {
          console.log('error');
        });
    };
  });
