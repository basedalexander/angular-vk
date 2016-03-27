'use strict';

var express = require('express');
var config = require('./config');
//var userRoutes = require('./routes/user');
//var notesRoutes = require('./routes/notes');
//var vkRoutes = require('./routes/vk');
var bodyParser = require('body-parser');
var cors = require('cors');
var headers = require('./middlewares/cors');
var mongoose = require('mongoose');
var User = require('./models/User');
var jwt = require('./services/jwt');
var ensureAuthenticated = require('./middlewares/ensureAuthenticated');
var vkAuth = require('./services/vkAuth');
var request = require('request');
var colors = require('colors');

var app = express();

app.use(bodyParser.json());
app.use(cors());
//app.use('/', userRoutes );
//app.use('/', notesRoutes);
//app.use('/', vkRoutes);

app.get('/api/me', ensureAuthenticated, function (req, res) {
  res.json(req.user);
});

app.put('/api/me', ensureAuthenticated, function (req, res) {
  var update,
    query,
    options;

  query = req.user.id;
  update = {
    $set: {
      displayName: req.body.displayName || req.user.displayName,
      email: req.body.email || req.user.email
    }
  };
  options = { new : true };

  mongoose.model('User').findByIdAndUpdate(query, update, options, function (err, updatedUser) {
    if (err) { return res.status(500).send({message: err.message}); }
    res.json(updatedUser);
  });
});

app.post('/auth/register', function (req, res){
  User.findOne({ email: req.body.email }, function (err, existingUser) {
    if (err) { return res.status(401).send({ message: err.message }); }
    if (existingUser) {
      return res.status(409).send({message: 'Email is already taken'});
    }

    var newUser = new User(req.body);
    newUser.save(function (err) {
     if (err) { return res.status(500).send({ message: err.message});}
      jwt.createAndSend(newUser, res);
    });
  })
});

app.post('/auth/login', function (req, res) {

  var searchUser = {
    email: req.body.email
  };

  User.findOne(searchUser, function (err, existingUser) {
    if (err) {
      return res.status(401).send({message: 'Invalid login or password'});
    }
    if (!existingUser) {
      return res.status(401).send({ message: 'Invalid login or password'});
    }

    existingUser.comparePassword(req.body.password, function (err, result) {
      if (err) {
        return res.status(401).send({message: 'Invalid login or password'});
      }
      if (!result) {
        return res.status(401).send({message: 'Invalid login or password'});
      }

      jwt.createAndSend(existingUser, res);
    });
  });
});

app.post('/auth/vk', vkAuth);

mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', function(err) {
  console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

var server = app.listen(config.API_PORT, function () {
  console.log('api listening on ', server.address().port);
});