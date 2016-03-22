'use strict';

var express = require('express');
var userRoutes = require('./routes/user');
var notesRoutes = require('./routes/notes');
var vkRoutes = require('./routes/vk');
var bodyParser = require('body-parser');
var headers = require('./middlewares/res-headers');
var mongoose = require('mongoose');
var User = require('./models/User');
var jwt = require('./services/jwt');
var jwtauth = require('./middlewares/jwtauth');
var request = require('request');

var app = express();

app.use(bodyParser.json());
app.use(headers);
app.use(jwtauth);
app.use('/', userRoutes );
app.use('/', notesRoutes);
app.use('/', vkRoutes);


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

      jwt.createAndSend(newUser, res);
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

      jwt.createAndSend(foundUser, res);
    });
  });
});


mongoose.connect('mongodb://localhost/appdata');

var server = app.listen(3000, function () {
  console.log('api listening on ', server.address().port);
});