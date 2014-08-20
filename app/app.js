var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express(); 
mongoose.connect('mongodb://localhost/twitter-clone');

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
 
var api = require('./api.js');
app.post('/user/', api.post);
app.get('/user/:id/', api.show);
app.get('/user/tweets/', api.list);
 
var server = app.listen(3001, function() {
    console.log('Listening on port %d', server.address().port);
  });