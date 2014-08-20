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


  app.get('/user/', function(req, res){
  userConstructor.findAll(function(error, Users){
    res.write(JSON.stringify(Users));
    res.end();
    });
  });

  // app.post('/user/login', function(req,res){
  //   userConstructor.login({
  //     tHandle           : req.body.tHandle,
  //     password          : req.body.password,
  //   },function(error, loggedin){
  //   if(error){
  //     res.status(404);
  //     res.end();
  //   }  
  //   else{
  //     res.write("Login successful" + loggedin);
  //     res.end();   
  //     } 
  //   });
  // });

  
  app.post('/user/', function(req, res){
  userConstructor.create({
    tHandle           : req.body.tHandle,
    password          : req.body.password,
  }, function(error, docs) {
  res.redirect('/user/');
  });
});
