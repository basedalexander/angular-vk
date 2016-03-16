'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var headers = require('./middlewares/res-headers.js');
var mongoose = require('mongoose');
var User = require('./models/User.js');


var app = express();
app.use(bodyParser.json());
app.use(headers);


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

      var sendUser = newUser.toJSON();
      sendUser.token = '123';

      res.status(200).send(sendUser);
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


      var sendUser = foundUser.toJSON();
      sendUser.token = '123';

      res.status(200).send(sendUser);
    });
  });
});


mongoose.connect('mongodb://localhost/appdata');

var server = app.listen(3000, function () {
  console.log('api listening on ', server.address().port);
});