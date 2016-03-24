'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');

var jwtSecret = 'shhh...';

module.exports = {
  createAndSend: function (user, res) {
    var expires = moment().add(10, 'days').valueOf();
    var token = jwt.encode({
      iss: user.id,
      exp: expires
    }, jwtSecret);

    res.json({
      token: token,
      expires: expires,
      user: user.toJSON()
    });
  },

  encode: function (thing) {
    return jwt.encode(thing, jwtSecret);
  },

  decode: function (token) {
   return jwt.decode(token, jwtSecret);
  }
};