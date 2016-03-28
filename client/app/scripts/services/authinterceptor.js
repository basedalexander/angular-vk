'use strict';


angular.module('app')
  .factory('authInterceptor', function (authToken) {

    return {
      'request' : function (config) {
        var access_token = authToken.getToken();

        if (access_token) {
          config.headers.Authorization = 'Bearer ' + access_token;
        }

        return config;
      },
      'response': function (response) {
        return response;
      }
    };
  });
