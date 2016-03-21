'use strict';

var express = require('express');
var routes = require('./routes/routes');
var bodyParser = require('body-parser');
var headers = require('./middlewares/res-headers');
var mongoose = require('mongoose');
var User = require('./models/User');
var jwt = require('jwt-simple');
var jwtauth = require('./middlewares/jwtauth');
var moment = require('moment');
var request = require('request');

var app = express();
app.set('jwtSecret', 'shhh...');

app.use(bodyParser.json());
app.use(headers);
app.use(jwtauth);
app.use('/', routes);


app.post('/register', function (req, res){
  var user = req.body;

  var searchUser = {
    email: req.body.email
  };

  User.findOne(searchUser, function (err, foundUser) {
    if (err) {
      return res.status(401).send(err.message);
    }
    if (foundUser) {
      return res.status(401).send('Email already exist');
    }

    var newUser = new User(user);

    newUser.save(function (err) {
     if (err) {
       return res.status(401).send('Error while saving the user');
     }

      createSendResponse(newUser, res);
    });
  })
});

app.post('/login', function (req, res) {

  var searchUser = {
    email: req.body.email
  };

  User.findOne(searchUser, function (err, foundUser) {
    if (err) {
      return res.status(401).send('Invalid login or password');
    }
    if (!foundUser) {
      return res.status(401).send('Invalid login or password');
    }

    foundUser.comparePassword(req.body.password, function (err, result) {
      if (err) {
        return res.status(401).send('Invalid login or password');
      }
      if (!result) {
        return res.status(401).send('Invalid login or password');
      }

      createSendResponse(foundUser, res);
    });
  });
});

app.post('/login/vk', function (req, res) {
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
    console.log('got profile: ', profile);

    var access_token = profile.access_token;
    var user_id = profile.user_id;

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

      var user = users[0];

    });

  });
});


function createSendResponse (user, res) {
  var expires = moment().add(125, 'minutes').valueOf();
  var token = jwt.encode({
    iss: user.id,
    exp: expires
  }, app.get('jwtSecret'));

  res.json({
    token: token,
    expires: expires,
    user: user.toJSON()
  });
}

mongoose.connect('mongodb://localhost/appdata');

var server = app.listen(3000, function () {
  console.log('api listening on ', server.address().port);
});