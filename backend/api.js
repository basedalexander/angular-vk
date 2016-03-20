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