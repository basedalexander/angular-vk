'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.post('/register', function (req, res){
  console.log(req.body);
});




var server = app.listen(3000, function () {
  console.log('api listening on ', server.address().port);
});