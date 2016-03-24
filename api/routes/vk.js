'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');
var jwt = require('../services/jwt');

var VK_TOKEN_URL = 'https://oauth.vk.com/access_token?';
var VK_API_URL = 'https://api.vk.com/method/';

router.post('/login/vk', function (req, res) {

  var code = req.body.code;
  var params = {
    client_id: 5352704,
    client_secret: 'gf11EQUehgJzzXB5AvrD',
    code: code,
    redirect_uri: req.body.redirect_uri
  };
  var options = {
    form: params,
    json: true
  };

  request.post(VK_TOKEN_URL, options, function (err, response, profile) {
    if (err) { return console.log('GETTING ACCESS TOKEN ERROR: ', err);}

    var access_token = profile.access_token;
    var user_id = profile.user_id;
    var email = profile.email;

    var params = {
      user_ids: user_id,
      fields: 'photo_50, first_name, last_name'
    };

    var options = {
      form: params,
      json: true
    };


    request.post(VK_API_URL + 'users.get?', options, function (err, res, users) {
      if (err) { return console.log('GETTING PROFILE ERROR : ', err);}

      var user = users.response[0];
      findMatch(user);
    });


    function findMatch (user) {
      mongoose.model('User').findOne({ vk_id: user.uid}, function (err, foundUser) {
        if (err) { return console.log('ERROR find user with vk_id ', err); }

        if (!foundUser) {
          return res.status(401).json({
            reason: 'not_attached',
            user: user
          });
        }
        console.log('user is found ', foundUser);
        jwt.createAndSend(foundUser, res);
      });
    }

  });
});

router.get('/vk/getUser', function (req, res, next) {
  var user = req.user;
  if (!user) {
    return res.send(401);
  }

  var params = {
    user_ids: user.vk_id,
    fields: 'photo_50, first_name, last_name'
  };

  var options = {
    form: params,
    json: true
  };

  request.post(VK_API_URL + 'users.get?', options, function (err, response, users) {
    if (err) {
      return console.log('GETTING PROFILE ERROR : ', err);
    }

    var user = users.response[0];

    res.json(user);
  });
});

router.get('/vk/getAlbums', function (req, res, next) {
  var user = req.user;
  if (!user) { return res.status(401).send("user not found"); }

  if (!user.vk_id) {
    return res.status(401).send("vk_id is not connected");
  }

  var params = {
    owner_id: user.vk_id,
    need_covers: 1,
    photo_sizes: 1
  };

  var options = {
    form: params,
    json: true
  };

  request.post(VK_API_URL + 'photos.getAlbums?', options, function (err, response, albums) {
    if (err) {
      return console.log('GETTING PROFILE ERROR : ', err);
    }

    console.log('albums: ', albums);

    res.json(albums.response);
  });
});

router.get('/vk/getAlbumPhotos/:albumID', function (req, res, next) {
  var user = req.user;
  if (!user) { return console.log('user is not found'); }

  if (!user.vk_id) {
    return res.status(401).send("vk_id is not connected");
  }

  var params = {
    owner_id: user.vk_id,
    album_id: req.params.albumID
  };

  var options = {
    form: params,
    json: true
  };

  request.post(VK_API_URL + 'photos.get?', options, function (err, response, photos) {
    if (err) {
      return console.log('GETTING PHOTOS ERROR : ', err);
    }

    console.log('fetched photos');
    res.json(photos.response);
  });
});

module.exports = router;
