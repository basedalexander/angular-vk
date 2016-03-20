'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');



router.get('/notes', function(req, res, next) {

  if (!req.user) {
    return res.status(401).send('Token not found');
  }

  res.send(req.user.getNotes());
});

router.post('/notes', function(req, res, next) {

  if (!req.user) {
    return res.status(401).send('Token not found');
  }


  var query = { _id: req.user.id };
  var update = {
    $addToSet: {
      notes: req.body
    }
  };
  var options = {
    new: true
  };

  mongoose.model('User').findOneAndUpdate(query, update, options, function (err, user) {
    if (err) { return console.log(err);}
    console.log(user.notes);
    res.send(user.notes);
  });
});

router.put('/notes', function(req, res, next) {

  if (!req.user) {
    return res.status(401).send('Token not found');
  }

  var query = { _id: req.user.id };
  var update = {
    $pull: {
      notes: req.body
    }
  };
  var options = {
    new: true
  };

  mongoose.model('User').findOneAndUpdate(query, update, options, function (err, user) {
    if (err) { return console.log(err);}
    res.send(user.notes);
  });
});


module.exports = router;
