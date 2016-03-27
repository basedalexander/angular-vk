'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');

module.exports = {
  createAndSend: function (user, res) {
    var expires = moment().add(10, 'days').valueOf();
    var token = jwt.encode({
      sub: user.id,
      exp: expires
    }, config.TOKEN_SECRET);

    res.json({
      token: token,
      expires: expires,
      user: user.toJSON()
    });
  },

  encode: function (thing) {
    return jwt.encode(thing, config.TOKEN_SECRET);
  },

  decode: function (token) {
   return jwt.decode(token, config.TOKEN_SECRET);
  }
};