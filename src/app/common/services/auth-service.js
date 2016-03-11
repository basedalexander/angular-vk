'use strict';

angular.module('app.common')
  .factory('Auth', ['UserModel', '$rootScope', '$q', '$state', function (UserModel, $rootScope, $q, $state) {

    var isAuthenticated = false;

    // Imidiately checks whether user logged or not,
    // if yes, then fetch user details and send them to the scopes
    VK.Auth.getLoginStatus(function (res) {
      if (res.status === 'connected') {
        console.log('Session info: ', res);
        isAuthenticated = true;
        UserModel.fetchInfo(function (user) {
          console.log('User info : ', user);
          $rootScope.$broadcast('userLogged', user);
        });
      } else {
        console.log('user is not authenticated');
        isAuthenticated = false;
        $rootScope.$broadcast('auth_required');
      }
    });


    function login() {
      VK.Auth.login(function (res) {
        if (res.session) {
          console.log('Logged in : ' + res.session.user.domain);
          isAuthenticated = true;
          UserModel.fetchInfo(function (user) {
            console.log('User info : ', user);
            $rootScope.$broadcast('userLoggedIn', user);
          });
          $state.go('albums.all');
        }
      }, 4);
    }

    function logout() {
      console.log('logged out');
      VK.Auth.logout();
      //$rootScope.$broadcast('userLoggedOut');
      UserModel.setCurrentUser = null;
      isAuthenticated = false;
    }


    function needAuth() {
      return $q(function (resolve, reject) {
        if (!isAuthenticated) {
          reject('auth_required');
        } else {
          resolve('allgood');
        }
      });
    }

    return {
      login: login,
      logout: logout,
      requireAuth: needAuth,
      isAuthenticated: function () {
        return isAuthenticated;
      }
    };
  }]);
