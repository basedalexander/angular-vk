'use strict';

var User = require('../models/User.js');
var jwt = require('jwt-simple');

var jwtSecret = 'shhh...';

module.exports = function (req, res, next) {
  var token = req.headers.authorization || (req.body && req.body.access_token) || (req.query && req.query.access_token);
  console.log('jwtAuth invoked');
  if (token) {
    try {
      var decoded = jwt.decode(token, jwtSecret);

      if (decoded.exp <= Date.now()) {
        res.end('Access token has expired', 400);
      } else {
        User.findOne({_id: decoded.iss}, function (err, foundUser) {
          req.user = foundUser;
          return next();
        });
      }

    } catch (err) {
      console.log('CAN"T DECODE JWT');
      console.log(err);
      return next();
    }

  } else {
    next();
  }
};