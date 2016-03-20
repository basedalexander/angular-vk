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

router.put('/notes/:noteId', function(req, res, next) {
  if (!req.user) {
    return res.status(401).send('Token not found');
  }

  var userId = req.user.id;
  var noteQuery = { 'notes._id' : req.params.noteId };
  var noteUpdate = {
    $set: {
      'notes.$.title' : req.body.title,
      'notes.$.text' : req.body.text
    }
  };

  mongoose.model('User').update(noteQuery, noteUpdate, function (err, result) {
    if (err) { return console.log('NOTE UPDATE ERROR ', err); }

    mongoose.model('User').findById(userId, function (err, user) {
      res.send(user.notes);
    });
  });
});

router.delete('/notes/:noteId', function(req, res, next) {

  if (!req.user) {
    return res.status(401).send('Token not found');
  }

  var query = req.user.id;
  var update = {
    $pull: {
      notes: {
        _id: req.params.noteId
      }
    }
  };
  var options = {
    new: true
  };

  mongoose.model('User').findByIdAndUpdate(query, update, options, function (err, user) {
    if (err) { return console.log(err);}

    res.send(user.notes);
  });
});

module.exports = router;
