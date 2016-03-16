'use strict';

angular.module('app')
  .factory('authToken', function ($window) {

    var storage =  $window.localStorage;
    var cachedToken;
    var key = 'userToken';

    var authToken = {
      getToken: function () {
        if (!cachedToken) {
          cachedToken = storage.getItem(key);
        }
        return cachedToken;
      },
      setToken: function (token) {
        cachedToken = token;
        storage.setItem(key, token);
      },
      removeToken: function () {
        cachedToken = null;
        storage.removeItem(key);
      },
      isAuthenticated: function () {
        return !!authToken.getToken(key);
      }
    };

    return authToken;
  });
