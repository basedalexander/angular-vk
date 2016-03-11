'use strict';

angular.module('app.common')
  .factory('UserModel', function ($rootScope) {

    var currentUser = null;

    function getCurrentUser () {
      return currentUser;
    }

    function setCurrentUser (user) {
      currentUser = user;
    }

    function getId (callback) {
      return currentUser.uid;
    }


    function fetchInfo (callback) {
      var method = 'users.get',
        params = {
          fields: 'photo_50'
        };

      VK.Api.call(method, params, function (res) {
        currentUser = res.response[0];
        $rootScope.$apply();
        console.log('currentUser === ', res.response[0]);
        callback(res.response[0]);
      });
    }

    return {
      fetchInfo : fetchInfo,
      getCurrentUser: getCurrentUser,
      setCurrentUser: setCurrentUser,
      getName: function () {
        return first_name;
      },
      getAvatar: function () {
        return avatar;
      },
      getId: getId
    };

  });
