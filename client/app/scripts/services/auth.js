'use strict';

angular.module('app')
  .service('auth', function ($http, $window, $state, authToken, API_URL, VK_OAUTH_URL, $q, albumsModel) {

    this.register = function (user) {

      var deferred = $q.defer();

      $http.post(API_URL + 'auth/register', user)
        .then(function (response) {
          authToken.setToken(response.data.token);
          deferred.resolve(response);
          $state.go('main');
        })
        .catch(function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    this.login = function (email,password) {
      var user = {
        email: email,
        password: password
      };

      var deferred = $q.defer();

      $http.post(API_URL + 'auth/login', user)
        .then(function (response) {
          authToken.setToken(response.data.token);
          deferred.resolve(response);
          $state.go('main');
        })
        .catch(function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    this.logout = function () {
      authToken.removeToken();
      $state.go('login');
    };

    this.vkAuth = function () {
      var popup,
        deferred,
        intervalId;

      deferred = $q.defer();

      function messageListener (event) {
        closePopup();

        if (event.data === 'error') {
          return deferred.reject('User denied authentication');
        }
        sendCode(event.data);
      }

      function openPopup () {
        var url,
          urlParams,
          options;

        urlParams = [
          'client_id=' + 5352704,
          'scope=' + (4 + 4194304), // email: 4194304
          'redirect_uri=' + $window.location.origin,
          'response_type=code',
          'v=' + 5.50
        ];

        url = VK_OAUTH_URL + urlParams.join('&');
        options = 'width=800, height=500, left=' + ($window.outerWidth - 800)/2 + ', to=' + ($window.outerHeight - 500)/2;
        popup = $window.open(url, '', options);


        $window.addEventListener('message', messageListener);
        checkIfPopupClosed();
      }

      function closePopup () {
        $window.removeEventListener('message', messageListener);
        $window.clearInterval(intervalId);
        popup.close();
      }

      function checkIfPopupClosed () {

        // That weird trick used because of same origin
        // policy between windows
        intervalId = $window.setInterval(function () {
          if (popup.closed) {
            $window.clearInterval(intervalId);
            intervalId = null;
            onPopupClosed();
          }
        }, 500);
      }

      function onPopupClosed () {
        $window.removeEventListener('message', messageListener);
        deferred.reject('User closed popup');
      }

      function sendCode (code) {
        var body = {
          code: code,
          redirect_uri: $window.location.origin
        };

        $http.post(API_URL + 'auth/vk', body)
          .then(function (response) {
            if (response.data && response.data.token) {
              clearCache();
              authToken.setToken(response.data.token);
            }
            deferred.resolve(response);
          })
          .catch(function (response) {
            deferred.reject(response);
          });
      }

      openPopup();

      return deferred.promise;
    };


    this.unlink = function (provider) {
      clearCache();
      return $http.post(API_URL + 'auth/unlink', {provider: provider});
    };

    function clearCache () {
      albumsModel.clearCache();
    }
  });
