'use strict';

angular.module('app.common')
  .factory('AlbumsModel', [ '$http', 'UserModel', function ($http, UserModel) {
    function getAll (callback) {
      var params = {
        need_covers: 1,
        photo_sizes: 1
      }

      VK.Api.call('photos.getAlbums', params, function (res) {
        callback(res.response);
      })
    }

    function getById (id, callback) {
      var params = {
        album_ids: id
      }

      VK.Api.call('photos.getAlbums', params, function (res) {
        callback(res.response[0].title);
      })
    }

    return {
      getAll: getAll,
      getById: getById
    }
  }]);
