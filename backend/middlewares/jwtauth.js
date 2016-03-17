'use strict';

var User = require('../models/User.js');
var jwt = require('jwt-simple');

module.exports = function (req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  console.log('jwtAuth invoked');
  if (token) {
    try {
      var decoded = jwt.decode(token, app.get('jwtSecret'));

      if (decoded.exp <= Date.now()) {
        res.end('Access token has expired', 400);
      } else {
        User.findOne({_id: decoded.iss}, function (err, foundUser) {
          req.user = foundUser;
        });
      }

    } catch (err) {
      return next();
    }

  } else {
    next();
  }
};