var mongoose = require('mongoose')
  , Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/testTweetDB');
  var mongoose = require('mongoose')
    , Schema = mongoose.Schema
  
  

  var userModel = require('./userModel');
  var user =  mongoose.model('user', userSchema); 
  var tweetSchema = Schema({
    tHandle         : user.tHandle,
    body            : String,
    // dated           : Date,
    // reTweetCount    : Number,
    // replies         : [{ type: String, ref: 'replySchema' }],
    // favourite       : Boolean
  }); 

  var Tweet  = mongoose.model('Tweet', tweetSchema);
  
  TweetProvider = function(){};

TweetProvider.prototype.findAll = function(callback) {
        Tweet.find({}, function (err, tweets) {
        callback( null, tweets )
      });  
  };



TweetProvider.prototype.home = function(){



}

TweetProvider.prototype.create = function(params, callback){
var newTweet = new Tweet(
  { 
    tHandle : params.tHandle,
    body    : params.body,
  });
  newTweet.save(function (err) {
  callback();
});
var newWall = new Wall(
  {
    
    
  })
}


TweetProvider.prototype.notifications = function(){
    //


}

TweetProvider.prototype.discover = function(){
    // tailored tweets


}

TweetProvider.prototype.me = function(){

    //tweets
    //following
    //followers

}

exports.TweetProvider = TweetProvider;
