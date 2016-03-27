'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');
var jwt = require('../services/jwt');
var ensureAuthenticated = require('../middlewares/ensureAuthenticated');

var VK_TOKEN_URL = 'https://oauth.vk.com/access_token?';
var VK_API_URL = 'https://api.vk.com/method/';


router.get('/api/vk/getUser', ensureAuthenticated, function (req, res, next) {
  var params = {
    user_ids: req.user.vkontakte,
    fields: 'photo_50, first_name, last_name'
  };

  var options = {
    form: params,
    json: true
  };

  request.post(VK_API_URL + 'users.get?', options, function (err, response, users) {
    if (err) {
      console.log(err.message.red);
      return res.status(500).send({message: err.message});
    }

    var user = users.response[0];

    res.json(user);
  });
});

//router.get('/vk/getAlbums', function (req, res, next) {
//  if (!user.vk_id) {
//    return res.status(401).send("vk_id is not connected");
//  }
//
//  var params = {
//    owner_id: user.vk_id,
//    need_covers: 1,
//    photo_sizes: 1
//  };
//
//  var options = {
//    form: params,
//    json: true
//  };
//
//  request.post(VK_API_URL + 'photos.getAlbums?', options, function (err, response, albums) {
//    if (err) {
//      return res.send(err);
//    }
//
//    res.json(albums.response);
//  });
//});
//
//router.get('/vk/getAlbumPhotos/:albumID', function (req, res, next) {
//  if (!user.vk_id) {
//    return res.status(401).send("vk_id is not connected");
//  }
//
//  var params = {
//    owner_id: user.vk_id,
//    album_id: req.params.albumID
//  };
//
//  var options = {
//    form: params,
//    json: true
//  };
//
//  request.post(VK_API_URL + 'photos.get?', options, function (err, response, photos) {
//    if (err) {
//      return console.log('GETTING PHOTOS ERROR : ', err);
//    }
//
//    console.log('fetched photos');
//    res.json(photos.response);
//  });
//});

module.exports = router;
