var mongoose = require('mongoose')
  , Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/userDB');
  var mongoose = require('mongoose')
    , Schema = mongoose.Schema


var tweetModel = require('./tweetModel');
var tweet =  mongoose.model('tweet', tweetSchema); 
var userSchema = Schema({
    tHandle    	: String,
    password  	: String,
    tweets		:[{ type: Schema.Types.ObjectId, ref: 'tweet' }],
    //startDate : Date,
    // tweets    : [{ type : String, ref: 'wallSchema'}],
    // following : { type : Number },
    // followers : { type : Number }
  });

var user = mongoose.model('user', userSchema);
userConstructor = function() {}; 

userConstructor.prototype.findAll = function(callback){
	user.find({}, function (err, Users) {
        callback( null, Users )
      });  
  };
// userConstructor.prototype.login = function(params, callback){
// 	if(params.tHandle == this.tHandle && params.password == this.password){
// 		callback();
// 	}
// 	else{
// 		console.error(error);
// 	}
// }

  userConstructor.prototype.create = function(params, callback){
var newUser = new user(
  { 
    tHandle 		: params.tHandle,
    password    	: params.password,
  });
  newUser.save(function (err) {
  callback();
});
//var newWall = new Wall(
  //{
    
    
  //})
};

exports.userConstructor = userConstructor;



// var OrderSchema = new mongoose.Schema({
//     items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
// });

// var ItemSchema = new mongoose.Schema({
//     price: Number,
//     quantity: Number
// });