'use strict';

var User = require('../models/User.js');
var jwt = require('../services/jwt');

module.exports = function (req, res, next) {

  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }

  var token = req.header('Authorization').split(' ')[1];

  if (!token) { return res.status(401).send({ message: 'Token not found'}); }

  try {
    var payload = jwt.decode(token);

  } catch (err) {
    return res.status(401).send({ message: err.message });
  }


  if (payload.exp <= Date.now()) {
    return res.status(400).send('Access token has expired');
  } else {
    User.findOne({_id: payload.sub}, function (err, foundUser) {

      if (err) { return res.status(401).send({ message: err.message});}

      if (!foundUser) {
        return res.status(400).send({ message: 'User not found' });
      }

      req.user = foundUser;
      return next();
    });
  }
};