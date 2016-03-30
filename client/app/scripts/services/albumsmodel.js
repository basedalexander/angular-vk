'use strict';

angular.module('app')
  .factory('albumsModel', function ($http, $q, API_URL) {

    var cachedAlbums = null;
    var cachedById = {};

    function cacheTitles (albums) {
      albums.forEach(function (album) {
        var id = album.aid;
        if (cachedById[id] && !cachedById[id].title) {
          cachedById[id].title = album.title;
        }

        if (!cachedById[id]) {
          cachedById[id] = { title: album.title};
        }
      });
    }

    function cachePhotos (albumId, photos) {
      if (!cachedById[albumId]) {
        cachedById[albumId] = {
          photos: photos
        };
        return;
      }
      cachedById[albumId].photos = photos;
    }

    function getAll () {
      var deferred = $q.defer();

        if (cachedAlbums) {
          deferred.resolve({ data: cachedAlbums });
          return deferred.promise;
        }

        $http.get(API_URL + 'vk/getAlbums')
          .then(function (response) {
            cachedAlbums = response.data;
            cacheTitles(response.data);
            deferred.resolve(response);
          })
          .catch(function (response) {
            deferred.reject(response);
          });

      return deferred.promise;
    }

    function getAlbumTitle (id) {
      var deferred = $q.defer();

      if (cachedById[id] && cachedById[id].title) {
        deferred.resolve(cachedById[id].title);
        return deferred.promise;
      }

      $http.get(API_URL + 'vk/getAlbums')
        .then(function (response) {
          cachedAlbums = response.data;
          cacheTitles(response.data);
          deferred.resolve(cachedById[id].title);
        })
        .catch(function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function getPhotosById (id) {
      var deferred = $q.defer();

      if (cachedById[id] && cachedById[id].photos) {
        deferred.resolve({ data: cachedById[id].photos });
        return deferred.promise;
      }

      $http.get(API_URL + 'vk/getAlbumPhotos/' + id)
        .then(function (response) {
          cachePhotos(id, response.data);
          deferred.resolve(response);
        })
        .catch(function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function clearCache () {
      cachedAlbums = null;
      cachedById = {};
    }

    return {
      getAll: getAll,
      getAlbumTitle: getAlbumTitle,
      getPhotosById : getPhotosById,
      clearCache: clearCache
    };
  });
