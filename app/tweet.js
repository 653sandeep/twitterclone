var mongoose = require('mongoose')
  , Schema = mongoose.Schema
//mongoose.connect('mongodb://localhost/testTweetDB');
//var mongoose = require('mongoose')
//, Schema = mongoose.Schema

var user = require('./user.js').model('user'); 
  
var tweetSchema = Schema({
  body            : [{ type : String, ref:'user'}],
  // dated           : Date,
  // reTweetCount    : Number,
  // replies         : [{ type: String, ref: 'replySchema' }],
  // favourite       : Boolean
}); 

//var tweet =  mongoose.model('tweet', tweetSchema); 
module.exports = mongoose.model('tweet', tweetSchema);