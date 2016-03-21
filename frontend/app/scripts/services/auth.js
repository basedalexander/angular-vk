'use strict';

angular.module('app')
  .service('auth', function ($http, $window, $state, authToken, API_URL, VK_OAUTH_URL,$q) {


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
    };

    this.loginVK = function () {

      var deferred = $q.defer();

      var url = VK_OAUTH_URL;

      var urlParams = [
        'client_id=' + 5352704,
        'scope=' + 4, // email: 4194304
        'redirect_uri=' + $window.location.origin,
        'response_type=code',
        'v=' + 5.50
      ];

      var options = 'width=800, height=500, left=' + ($window.outerWidth - 800)/2
        + ', to=' + ($window.outerHeight - 500)/2;

      url = url + urlParams.join('&');

      var popup = $window.open(url, '', options);

      $window.addEventListener('message', listener);

      function listener (event) {
        var body;

        popup.close();

        if (event.data === 'error') {
          return deferred.reject('User denied');
        }

        console.log('user accepted');

        body = {
          code: event.data,
          redirect_uri: $window.location.origin,
        };

        $http.post(API_URL + 'login/vk', body)
          .success(function (response) {
            console.log('response1! ', response);
          })
          .error(function (reason) {
            console.log('reason : ', reason);
          });
      }

      return deferred.promise;
    }
  });
