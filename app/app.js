var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express(); 
mongoose.connect('mongodb://localhost/twitter-clone');

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
 
var api = require('./api.js');
app.post('/users/', api.create);
app.get('/users/:tHandle/', api.show);
app.get('/users/', api.list);
app.post('/users/:tHandle/tweet/',api.createTweet);
app.post('/users/:tHandle1/following/:tHandle2/',api.addToFollowing);
app.get('/users/:tHandle1/followers/',api.showFollowers);
app.post('/users/:tHandle1/retweet/:tHandle2/:tweetId',api.doRetweet);
 
var server = app.listen(3001, function() {
    console.log('Listening on port %d', server.address().port);
  });