var mongoose = require('mongoose')
var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var app = express();
var bodyParser = require('body-parser');
var url=require('url');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var userConstructor = require('./userModel').userConstructor;
var userConstructor = new userConstructor();


  var server = app.listen(3001, function() {
    console.log('Listening on port %d', server.address().port);
  });


  app.get('/users/', function(req, res){
  userConstructor.findAll(function(error, Users){
    res.write(JSON.stringify(Users));
    res.end();
    });
  })

  })
  
  app.post('/users/new/', function(req, res){
  userConstructor.New({
    tHandle           : req.body.tHandle,
    password          : req.body.password,
  }, function(error, docs) {
  res.redirect('/users/');
  });
});