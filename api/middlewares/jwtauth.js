'use strict';

var User = require('../models/User.js');
var jwt = require('../services/jwt');

var jwtSecret = 'shhh...';

module.exports = function (req, res, next) {
  var token = req.headers.authorization || (req.body && req.body.access_token) || (req.query && req.query.access_token);
  console.log('jwtAuth invoked');
  if (token) {
    try {
      var decoded = jwt.decode(token);

      if (decoded.exp <= Date.now()) {
        return res.status(400).send('Access token has expired');
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