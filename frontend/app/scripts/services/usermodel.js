'use strict';


angular.module('app')
  .service('userModel', function ($http, API_URL, VK_OAUTH_URL, $q, $window) {
    var cachedUser = null;
    var cachedVkUser = null;


    this.getUser = function () {
      var deferred = $q.defer();

      if (cachedUser) {
        console.log('return cached user');
        deferred.resolve(cachedUser);
        return deferred.promise;
      }

      $http.get(API_URL + 'user')
        .success(function (response) {
          cachedUser = response;
          deferred.resolve(response);
        })
        .error(function (reason) {
          deferred.reject(reason);
        });

      return deferred.promise;
    };

    this.updateUser = function (update) {
      var deferred = $q.defer();

      $http.post(API_URL + 'user/update', update)
        .success(function (response) {
          cachedUser = response;
          deferred.resolve(response);
        })
        .error(function (reason) {
          deferred.reject(reason);
        });

      return deferred.promise;
    };

    this.attachVK = function () {
      var popup,
        deferred,
        intervalId;

      deferred = $q.defer();

      openPopup();

      function messageListener (event) {
        console.log('got event ', event.data);
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

        $http.post(API_URL + 'user/attachVK', body)
          .success(function (response) {
            cachedUser = response;
            deferred.resolve(response);
          })
          .error(function (reason) {
            deferred.reject(reason);
          });
      }

      return deferred.promise;
    };

    this.detachVK = function () {
      var deferred = $q.defer();
      $http.get(API_URL + 'user/detachVK')
        .success(function (response) {
          delete cachedUser.vk_id;
          cachedVkUser = null;
          deferred.resolve(response);
        })
        .error(function (reason) {
          deferred.reject(reason);
        });

      return deferred.promise;
    };

    this.getVkUser = function () {
      var VK_API_URL = 'https://api.vk.com/method/';
      var deferred = $q.defer();

      if (cachedVkUser) {
        console.log('return cached vkuser');
        deferred.resolve(cachedVkUser);
        return deferred.promise;
      }


      $http.get(API_URL + 'vk/getUser/')
        .success(function (response) {
          cachedVkUser = response;
          deferred.resolve(response);
        })
        .error(function (reason) {
          deferred.reject(reason);
        });


      return deferred.promise;
    };

    this.clearCache = function () {
      cachedUser = null;
      cachedVkUser = null;
    }
  });
