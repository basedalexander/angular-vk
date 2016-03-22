'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');



router.get('/user', function(req, res, next) {

  if (!req.user) {
    return res.status(401).send('Token not found');
  }

  res.send(req.user.toJSON());
});


module.exports = router;
