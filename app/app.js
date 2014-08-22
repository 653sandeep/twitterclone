var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express(); 
mongoose.connect('mongodb://localhost/twitter-clone');

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
 
var api = require('./api.js');
app.post('/user/', api.create);
app.get('/user/:tHandle/', api.show);
app.get('/users/', api.list);
app.post('/user/:tHandle/tweet/',api.createTweet);
//app.get('/user/:tHandle/tweeta/',api.showTweets);
 
var server = app.listen(3001, function() {
    console.log('Listening on port %d', server.address().port);
  });