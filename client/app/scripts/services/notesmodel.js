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
    };

    this.saveNote = function (note) {
      var deferred = $q.defer();

      $http.post(API_URL + 'notes', note)
        .success(function (response) {
          deferred.resolve(response);
        })
        .error(function (reason) {
          deferred.reject(reason);
        });

      return deferred.promise;
    };

    this.updateNote = function (noteId, fields) {
      var deferred = $q.defer();

      $http.put(API_URL + 'notes' + '/' + noteId, fields)
        .success(function (response) {
          deferred.resolve(response);
        })
        .error(function (reason) {
          deferred.reject(reason);
        });

      return deferred.promise;
    };

    this.removeNote = function (noteId) {
      var deferred = $q.defer();

      $http.delete(API_URL + 'notes' + '/' + noteId)
        .success(function (response) {
          deferred.resolve(response);
        })
        .error(function (reason) {
          deferred.reject(reason);
        });

      return deferred.promise;
    };
  });
