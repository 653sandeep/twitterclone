var mongoose = require('mongoose')
  , Schema = mongoose.Schema 

  ,ObjectId = Schema.ObjectId;

  var tweet = require('./tweet.js').model('tweet');  
  //var tweet =  mongoose.

var userSchema = Schema({
	tweet       : ObjectId,
  tHandle    	: String,
  password  	: String,
  tweets		  : [{type: Schema.Types.ObjectId, ref: 'tweet' }],            
//startDate   : Date,
//tweets      : [{ type : String, ref: 'wallSchema'}],
  following   : [{ type: Schema.Types.ObjectId, ref: 'user' }],
//followers   : [{ type: Schema.Types.ObjectId, ref: 'user' }], 
});
var user =  mongoose.model('user', userSchema);  

user.schema.path('tHandle').required(true, ' tHandle is a required field ');
user.schema.path('password').required(true, ' password is a required field ');

user.schema.path('tHandle').validate(function(value){  
  return /[A-Za-z0-9_]/.test(value);
},'Invalid paramaters!');

user.schema.path('password').validate(function(value){
  return /[A-Za-z0-9_]/.test(value);
},'Invalid paramaters!');

module.exports = mongoose.model('user', userSchema);

