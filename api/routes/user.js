'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');


router.get('/user', function(req, res, next) {
  res.send(req.user.toJSON());
});

router.post('/user/update', function (req, res, next) {
  var user = req.user;
  var update,
    query,
    options;

  if (!user) {
    return res.status(401).send('Token not found');
  }

  console.log(req.body);

  query = user.id;
  update = { $set: req.body };
  options = { new : true };

  mongoose.model('User').findByIdAndUpdate(query, update, options, function (err, updatedUser) {
    if (err) { throw new Error("can't update use data");}

    res.json(updatedUser);
  });

});

router.post('/user/connectVK', function(req, res, next) {
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

    mongoose.model('User').findOneAndUpdate({ vk_id: user_id}, { $unset: { vk_id: ''}}, {}, function (err, user) {
      if (err) { return console.log("can't save user", err);}
    });

    var query = user.id;
    var update = { $set: { vk_id : user_id } };
    var options = { new: true };

    mongoose.model('User').findByIdAndUpdate(query, update, options, function (err, user) {
      if (err) { return console.log("can't save user", err);}
      res.json(user);
    });
  });
});

router.get('/user/detachVK', function (req, res, next) {
  var user = req.user,
    query,
    update,
    options;

  if (!user) {
    return res.status(401).send('Token not found');
  }

  query = user.id;
  update = { $unset: { vk_id: ''}};
  options = { new: true};
  mongoose.model('User').findByIdAndUpdate(query, update, options, function (err, user) {
    if (err) { return console.log("can't unset vk_id", err);}

    res.json(user);
  });

});

module.exports = router;
