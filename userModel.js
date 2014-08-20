var mongoose = require('mongoose')
  , Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/testTweetDB');
  var mongoose = require('mongoose')
    , Schema = mongoose.Schema



var userSchema = Schema({
    userid    : Number,
    startDate : Date,
    tweets    : [{ type : String, ref: 'wallSchema'}],
    following : { type : Number },
    followers : { type : Number }
  })