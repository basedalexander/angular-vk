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


module.exports = router;
