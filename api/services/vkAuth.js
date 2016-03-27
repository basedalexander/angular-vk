var User = require('../models/User');
var config = require('../config');
var colors = require('colors');
var jwt = require('../services/jwt');
var request = require('request');


module.exports = function (req, res) {
  var code = req.body.code;
  var params = {
    client_id: config.VK_CLIENT_ID,
    client_secret: config.VK_SECRET,
    code: code,
    redirect_uri: req.body.redirect_uri
  };

  var options = {
    form: params,
    json: true
  };

  // Step 1. Exchange authorization code for access token
  request.post(config.VK_TOKEN_URL, options, function (err, response, profile) {
    if (err) {
      console.log(err.message.red);
      return res.status(500).send({message: err.message});
    }

    var params = {
      user_ids: profile.user_id,
      fields: 'photo_50, first_name, last_name'
    };

    var options = {
      form: params,
      json: true
    };

    // Step 2. Retrieve vk profile information
    request.post(config.VK_API_URL + 'users.get?', options, function (err, response, users) {
      if (err) {
        console.log(err.message.red);
        return res.status(500).send({message: err.message});
      }

      var user = users.response[0];

      // Step 3a. Link user accounts
      if (req.header('Authorization')) {
        User.findOne({vkontakte: user.uid}, function (err, existingUser) {
          if (existingUser) {
            return res.status(409).send({message: 'There is already a Vkontake account that belongs to you'});
          }

          var token = req.header('Authorization').split(' ')[1];
          var payload = jwt.decode(token);

          // Update fields and send back updated user
          User.findById(payload.sub, function (err, foundUser) {
            var update = {
              $set: {
                vkontakte: user.uid,
                picture: foundUser.picture || user.photo_50,
                displayName: foundUser.displayName || user.first_name
              }
            };
            User.findByIdAndUpdate(payload.sub, update, {new: true}, function (err, updatedUser) {
              return res.json(updatedUser);
            });
          });
        });
      } else {

        // Step 3b. Create a new user account or return existing one
        User.findOne({ vkontakte: user.uid}, function (err, foundUser) {

          if (err) {
            console.log(err.message.red);
            return res.status(401).send({ message: err.message});
          }

          if (foundUser) {
            return jwt.createAndSend(foundUser, res);
          }

          return res.status(401).send({message: 'Create a new account and link vkontake profile to it'})

        });
      }
    });


  });
};