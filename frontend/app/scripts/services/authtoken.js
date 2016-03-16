'use strict';

/**
 * @ngdoc service
 * @name app.authToken
 * @description
 * # authToken
 * Factory in the app.
 */
angular.module('app')
  .factory('authToken', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
