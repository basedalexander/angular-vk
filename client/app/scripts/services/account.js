'use strict';


angular.module('app')
  .service('account', function ($http, API_URL, VK_OAUTH_URL, $q, $window, albumsModel, $rootScope) {

    this.getProfile = function () {
      return $http.get(API_URL + 'api/me');
    };

    this.updateProfile = function (update) {
      return $http.put(API_URL + 'api/me', update);
    };

    this.getVkUser = function () {
      return $http.get(API_URL + 'api/vk/getUser');
    };

  });
