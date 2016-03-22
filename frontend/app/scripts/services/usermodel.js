'use strict';


angular.module('app')
  .service('userModel', function ($http, API_URL, VK_OAUTH_URL, $q, $window) {

    this.getData = function () {
      var deferred = $q.defer();

      $http.get(API_URL + 'user')
        .success(function (response) {
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

          })
          .error(function (response) {

          });
      }

      return deferred.promise;
    }
  });
