'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');


router.get('/user', function(req, res, next) {

  if (!req.user) {
    return res.status(401).send('Token not found');
  }

  res.send(req.user.toJSON());
});


router.post('/user/attachVK', function(req, res, next) {
  var user = req.user;

  if (!user) {
    return res.status(401).send('Token not found');
  }


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
    //console.log('got user profile ', profile);

    var access_token = profile.access_token;
    var user_id = profile.user_id;
    var email = profile.email;
    //
    //var params = {
    //  user_ids: user_id,
    //  fields: 'photo_50, first_name, last_name'
    //};
    //
    //var options = {
    //  form: params,
    //  json: true
    //};
    console.log('req.user.id ', req.user.id);
    var query = { email: 'jerk401@gmail.com' };
    var update = { vk_id: 123 };
    var options = { new: true };

    console.log('userId is :', req.user._id);

    mongoose.model('User').update(query, update, options, function (err, updatedUser) {
      if (err) { return console.log('ERROR WHILE ADDING VK_ID: ', err);}
      console.log('got updated user: ', updatedUser);
    });


    //request.post(VK_API_URL + 'users.get?', options, function (err, res, users) {
    //  if (err) { return console.log('GETTING PROFILE ERROR : ', err);}
    //
    //  var user = users.response[0];
    //  console.log('got user data: ', user);
    //  findMatch(user);
    //});

  });
});


module.exports = router;
