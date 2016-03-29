'use strict';


angular.module('app')
  .factory('authInterceptor', function (authToken) {

    return {
      'request' : function (config) {
        var accessToken = authToken.getToken();

        if (accessToken) {
          config.headers.Authorization = 'Bearer ' + accessToken;
        }

        return config;
      },
      'response': function (response) {
        return response;
      }
    };
  });
