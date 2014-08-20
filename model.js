var mongoose = require('mongoose')
  , Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/testTweetDB');
  var mongoose = require('mongoose')
    , Schema = mongoose.Schema
  
  var tweetSchema = Schema({
    tHandle         : String,
    body            : String,
    dated           : Date,
    reTweetCount    : Number,
    replies         : [{ type: String, ref: 'replySchema' }],
    favourite       : Boolean
  }); 

  var wallSchema = Schema({
    tweets          : [{ type : String, ref : 'tweet'}],
    reply           : [{ type : String, ref : 'tweet'}],
    reTweetCount    : [{ type : String, ref : 'tweet'}],
    fav             : []
  });

  var replySchema = Schema({
    user_id     : { type: Number, ref: 'userSchema' },
    reply_id    : { type: Number, ref: 'wallSchema' },
    replyText   : { type: String, ref: 'wallSchema' },
  });

  var userSchema = Schema({
    userid    : Number,
    startDate : Date,
    tweets    : [{ type : String, ref: 'wallSchema'}],
    following : { type : Number },
    followers : { type : Number }
  })
  var Tweet  = mongoose.model('Tweet', tweetSchema);  
  var Wall   = mongoose.model('Wall', wallSchema);
  TweetProvider = function(){};

TweetProvider.prototype.findAll = function(callback) {
        Tweet.find({}, function (err, tweets) {
        callback( null, tweets )
      });  
  };



TweetProvider.prototype.home = function(){



}

TweetProvider.prototype.composeNew = function(params, callback){
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
