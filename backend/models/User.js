"use strict";

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  notes: Array
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

userSchema.methods.getNotes = function () {
  var user = this.toObject();
  return user.notes;
};

userSchema.methods.saveNote = function (note, callback) {
  mongoose.model('User').findOneAndUpdate({_id: this.id}, { $push : {notes: note}}, callback);
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