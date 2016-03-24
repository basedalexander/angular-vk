'use strict';

angular.module('app')
  .factory('albumsModel', function ($http, $q, API_URL) {

    var cachedAlbums = null;
    var cachedById = {};

    function cacheTitles (albums) {
      albums.forEach(function (album) {
        var id = album.aid;
        if (cachedById[id] && !cachedById[id].title) {
          cachedById[id].title = album.title
        }

        if (!cachedById[id]) {
          cachedById[id] = { title: album.title}
        }
      });
    }

    function cachePhotos (albumId, photos) {
      if (!cachedById[albumId]) {
        return cachedById[albumId] = {
          photos: photos
        };
      }
      cachedById[albumId].photos = photos;
    }

    function getAll () {
      var deferred = $q.defer();

        if (cachedAlbums) {
          deferred.resolve(cachedAlbums);
          return deferred.promise;
        }

        $http.get(API_URL + 'vk/getAlbums')
          .success(function (response) {
            cachedAlbums = response;
            cacheTitles(response);
            deferred.resolve(response);
          })
          .error(function (reason) {
            deferred.reject(reason);
          });

      return deferred.promise;
    }

    function getTitleById (id) {
      var deferred = $q.defer();

      if (cachedById[id] && cachedById[id].title) {
        console.log('return cached title');
        deferred.resolve(cachedById[id].title);
        return deferred.promise;
      }

      $http.get(API_URL + 'vk/getAlbums')
        .success(function (response) {
          cachedAlbums = response;
          cacheTitles(response);
          deferred.resolve(cachedById[id].title);
        })
        .error(function (reason) {
          deferred.reject(reason);
        });

      return deferred.promise;
    }

    function getPhotosById (id) {
      var deferred = $q.defer();

      if (cachedById[id] && cachedById[id].photos) {
        console.log('return cached photos');
        deferred.resolve(cachedById[id].photos);
        return deferred.promise;
      }

      $http.get(API_URL + 'vk/getAlbumPhotos/' + id)
        .success(function (photos) {
          cachePhotos(id, photos);
          deferred.resolve(photos);
        })
        .error(function (reason) {
          deferred.reject(reason);
        });

      return deferred.promise;
    }

    function clearCache () {
      var cachedAlbums = null;
      var cachedById = {};
    }
    return {
      getAll: getAll,
      getTitleById: getTitleById,
      getPhotosById : getPhotosById,
      clearCache: clearCache
    }
  });
