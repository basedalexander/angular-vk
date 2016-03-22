'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');
var jwt = require('../services/jwt');

router.post('/login/vk', function (req, res) {
  var VK_TOKEN_URL = 'https://oauth.vk.com/access_token?';
  var VK_API_URL = 'https://api.vk.com/method/';
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
    console.log('got user profile ', profile);

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
      console.log('got user data: ', user);
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

        jwt.createAndSend(user, res);
      });
    }



  });
});

module.exports = router;
