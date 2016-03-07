'use strict';

angular.module('app.common')
  .factory('PhotosModel', function () {

    function getAll (albumId, callback) {
      var params = {
        album_id: albumId
      }
      VK.Api.call('photos.get', params, function (res) {
        callback(res.response);
        console.log('Photos.get: ', res.response);
      });
    }

    return {
      getAll: getAll
    };

  });
