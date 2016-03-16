"use strict";

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String
});

userSchema.methods.comparePassword = function (password, callback) {
  var user = this;
  bcrypt.compare(password, user.password, callback);
};

userSchema.methods.toJSON = function (callback) {
  var user = this.toObject();
  delete user.password;
  return user;
};


userSchema.pre('save', function (next) {
  var user = this;

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }

    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);