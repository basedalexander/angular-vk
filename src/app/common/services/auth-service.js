'use strict';

angular.module('app.common')
  .factory('Auth', ['UserModel', '$rootScope', '$q', function (UserModel, $rootScope, $q) {

    var requireAuth = false;

    // Imidiately checks whether user logged or not,
    // if yes, then fetch user details and send them to the scopes
    VK.Auth.getLoginStatus(function (res) {
      if (res.status === 'connected') {
        console.log('Session info: ', res);
        requireAuth = false;
        UserModel.fetchInfo(function (user) {
          console.log('User info : ', user);
          $rootScope.$broadcast('userLogged', user);
        });
      } else {
        console.log('user is not authenticated');
        requireAuth = true;
        $rootScope.$broadcast('auth_required');
      }
    });


    function login() {
      VK.Auth.login(function (res) {
        if (res.session) {
          console.log('Logged in : ' + res.session.user.domain);
          requireAuth = false;

          UserModel.fetchInfo(function (user) {
            console.log('User info : ', user);
            $rootScope.$broadcast('userLoggedIn', user);
          });
        }
      }, 4);
    }

    function logout() {
      console.log('logged out');
      VK.Auth.logout();
      $rootScope.$broadcast('userLoggedOut');
      requireAuth = true;
    }


    function needAuth() {
      return $q(function (resolve, reject) {
        if (requireAuth) {
          reject('auth_required');
        } else {
          resolve('allgood');
        }
      });
    }

    return {
      login: login,
      logout: logout,
      requireAuth: needAuth
    };
  }]);
