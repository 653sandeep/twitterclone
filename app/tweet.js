var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var user = require('./user.js');
var tweetSchema = Schema({
  tweetBody            : { type : String, ref:'user'},
  // dated           : Date,
  // reTweetCount    : Number,
  // replies         : [{ type: String, ref: 'replySchema' }],
  // favourite       : Boolean
}); 

var tweet =  mongoose.model('tweet', tweetSchema); 

tweet.schema.path('tweetBody').required(true, ' tweetBody is a required field ');

tweet.schema.path('tweetBody').validate(function(value){  
  return /[A-Za-z0-9_]/.test(value);
},'Invalid paramaters!');
//var user = require('./user.js').model('user'); 
//var tweet =  mongoose.model('tweet', tweetSchema); 
//var tweet = require('./tweet.js').model('tweet');
module.exports = mongoose.model('tweet', tweetSchema);