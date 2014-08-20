var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  ,ObjectId = Schema.ObjectId;

var userSchema = Schema({
	tweet       : ObjectId,
    tHandle    	: String,
    password  	: String,
    tweets		:[{ type: Schema.Types.ObjectId, ref: 'tweet' }],
    //startDate : Date,
    // tweets    : [{ type : String, ref: 'wallSchema'}],
    // following : { type : Number },
    // followers : { type : Number }
  });
//var user =  mongoose.model('user', userSchema);  

module.exports = mongoose.model('user', userSchema);
