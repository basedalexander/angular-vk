'use strict';

angular.module('app')
  .service('notesModel', function ($http, API_URL, $q) {


    this.getNotes = function () {
      var deferred = $q.defer();

      $http.get(API_URL + 'notes')
        .success(function (response) {
          deferred.resolve(response);
        })
        .error(function (reason) {
          deferred.reject(reason);
        });

      return deferred.promise;
    }
  });
