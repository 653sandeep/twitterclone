
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/testDB');
	var mongoose = require('mongoose')
  	, Schema = mongoose.Schema
  
	var postSchema = Schema({
  		post_id     : Number,
  		title       : String,
  		url         : String,
  		votecount   : Number,
  		comments 	: [{ type: String, ref: 'commentSchema' }]
	});

	var commentSchema = Schema({

  		comment_id  : { type: Number, ref: 'postSchema' },
  		commentText : { type: String, ref: 'postSchema' },
  		userid     : { type: Number, ref: 'userSchema' }
	});
	var Post  = mongoose.model('Post', postSchema);	
	PostProvider = function(){};

	PostProvider.prototype.findAll = function(callback) {
  			Post.find({}, function (err, posts) {
    		callback( null, posts )
  		});  
	};

	PostProvider.prototype.findById = function(id, callback) {
  		Post.findById(id, function (err, post) {
    		if (!err) {
	  		callback(null, post);
			}
  		});
	};
	
	PostProvider.prototype.save = function(params, callback) {
  		var post = new Post(
  			{ post_id	: params.post_id,
  			  title		: params.title,
  			  url		: params.url,
  			  votecount : params.votecount 
  			});
  		post.save(function (err) {
    	callback();
  		});
	};

	PostProvider.prototype.addCommentToPost = function(postId, comment, callback) {
  	this.findById(postId, function(error, post) {
    	if(error)
    	{
	  		callback(error)
		}
    	else 
    	{
    		console.log(comment);
	  		post.comments.push(comment.userid,comment.comment_id,comment.commentText);
	  		post.save(function (err) {   
	    	if(!err){
		  		callback();
	    	}	
	  		});
    	}
  	});
  };

PostProvider.prototype.updateById = function(id, body, callback) {
  Post.findById(id, function (err, post) {
    if (!err) {
    post.title     = body.title;
    post.body      = body.body;
    post.post_id   = body.post_id,
    post.url       = body.url,
    post.votecount = body.votecount, 
    post.save(function (err) {
      if(!err){
      callback();
      }  
    });
  }
  if(err){
    callback(err);
  }
  });
};
exports.PostProvider = PostProvider;












