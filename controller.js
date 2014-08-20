var mongoose = require('mongoose')
var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var app = express();
var bodyParser = require('body-parser');
var url=require('url');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

  var server = app.listen(3001, function() {
    console.log('Listening on port %d', server.address().port);
  });
  
var PostProvider = require('./testModel').PostProvider;
var PostProvider= new PostProvider();

app.get('/posts/', function(req, res){
  PostProvider.findAll(function(error, posts){
    res.write(JSON.stringify(posts));
    res.end();
    });
  })

//show
app.get('/posts/:id', function(req, res){
  PostProvider.findById(req.params.id, function(error, post) {
    res.write(JSON.stringify(post));
    res.end();
    });
  });

app.post('/posts/new', function(req, res){
  PostProvider.save({
    post_id   : req.params.post_id,
    title     : req.body.title,
    url       : req.body.url,
    votecount : req.body.votecount
  }, function(error, docs) {
  res.redirect('/posts/');
  });
});


app.post('/posts/addComment', function(req, res){
  PostProvider.addCommentToPost(req.body._id, {
    comment_id   : req.body.comment_id,
    commentText  : req.body.commentText,
    userid       : req.body.userid,
  }, function(error, docs) {
    res.redirect('/posts/' + req.body._id)
  });
});


//update
app.post('/posts/:id/edit', function(req, res){
  PostProvider.updateById(req.params.id, req.body, function(error, post) {
    if(error){
      return res.status(404).send("Problem loading records", err.message);  
    }
    res.redirect('/posts/');
  });
});

