var mongoose = require('mongoose')
var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var app = express();
var bodyParser = require('body-parser');
var url=require('url');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var TweetProvider = require('./testTweet').TweetProvider;
var TweetProvider= new TweetProvider();


  var server = app.listen(3001, function() {
    console.log('Listening on port %d', server.address().port);
  });


  app.get('/users/', function(req, res){
  TweetProvider.findAll(function(error, tweets){
    res.write(JSON.stringify(tweets));
    res.end();
    });
  })


  
  app.post('/users/tweet/', function(req, res){
  TweetProvider.composeNew({
    tHandle   : req.body.tHandle,
    body      : req.body.body,
  }, function(error, docs) {
  res.redirect('/tweet/');
  });
});