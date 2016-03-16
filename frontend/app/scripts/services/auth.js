'use strict';

angular.module('app')
  .service('auth', function ($http, $state, authToken, API_URL, $q) {


    this.register = function (user) {

      var deferred = $q.defer();

      $http.post(API_URL + 'register', user)
        .success(function (response) {
          authToken.setToken(response.token);
          deferred.resolve(response);
          $state.go('main');
        })
        .error(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    this.login = function (email,password) {
      var user = {
        email: email,
        password: password
      };

      var deferred = $q.defer();

      $http.post(API_URL + 'login', user)
        .success(function (response) {
          authToken.setToken(response.token);
          deferred.resolve(response);
          $state.go('main');
        })
        .error(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    this.logout = function () {
      authToken.removeToken();
      $state.go('login');
    }
  });
