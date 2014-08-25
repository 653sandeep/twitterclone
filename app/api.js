var user = require('./user.js');
var tweet = require('./tweet.js');
var _ = require('underscore');
var arrOfKeys = ['tHandle','tweets','following','followers'];

picker = function(obj,arrOfKeys){
  return _.pick(obj,arrOfKeys);
}
 
exports.create = function(req, res) {
  var saved = new user({tHandle: req.body.tHandle, password: req.body.password});
  saved.save(function (err) {
    if (err) { 
      res.status(422);
      res.write("Rejected" + JSON.stringify(picker(saved,arrOfKeys)));
      res.end();          
    }
    else{
      console.log(saved);
      var o = _.omit(saved, 'password');
      console.log("omited",o);
      var e =_.pick(saved,arrOfKeys);
      console.log(e);
      res.write("Accepted" + JSON.stringify(_.pick(saved,'tHandle')));
      res.end();          
    }
  });
}

var tweetz = require('./tweet.js').model('tweet'); 
 
exports.list = function(req, res) {
  user.find({},function(err, users) {
    if(err){
      res.status(404);
      res.write("No users found!");
      res.end();
    }
    else{
      res.write("" + JSON.stringify(_.pluck(users,arrOfKeys)));
      res.end();
      return _.pluck(users,arrOfKeys);
    }
  });
}
 
exports.show = function(req, res) {
  var tempArray=[];
  user.find({ tHandle: req.params.tHandle }).populate('tweets').exec(function(error, users){
    if(error){
      res.status(404);
      res.write("No users found!");
      res.end();
    }
    else{
      for(var i=0;i<users[0].tweets.length;i++){
        tempArray.push(users[0].tweets[i]._id);
      }  
      tweet.find({_id: { $in: tempArray} },function(err, found){
        if(err){
          res.status(404);
          res.write("No tweets found!");
          res.end();
        }
        else{
          res.write(JSON.stringify(picker(found,arrOfKeys)));
          res.write(JSON.stringify(found));
          res.end();
        }
      });
    }
  });
}   
    
  

exports.createTweet = function(req,res){
  user.find({ tHandle: req.params.tHandle }).populate('tweets').exec(function(error, users){
    var newTweet = new tweet({tweetBody : req.body.tweetBody});
    newTweet.save(function(err){
      if(!err){
        if(JSON.stringify(newTweet.tweetBody).length<=140){
          res.write("Accepted" + JSON.stringify(picker(users[0],arrOfKeys)));
          res.end();  
        }
        else{
        res.status(413);
        res.write("Tweet exceeds 140 chars");
        res.end(); 
        }
      } 
      else{
        res.status(422);
        res.write("Rejected" + JSON.stringify(picker(users[0],arrOfKeys)));
        res.end(); 
      }  
    });          
    users[0].tweets.push(newTweet);
    users[0].save(function (err) {
        if (err) { 
          res.status(422);
          res.write("Rejected" + JSON.stringify(picker(users[0],arrOfKeys)));
          res.end();          
        } 
      });
    //console.log(users[0]);
    //console.log("-----3------");
    //console.log(users);
  });
}


exports.addToFollowing = function(req,res){
  user.find({ tHandle: req.params.tHandle1 }, function(error1, user1) {
    if(error1){
      res.status(404);
      res.write("User " + req.params.tHandle1 + "not found!(also cannot follow self)" );
      res.end();
    }
    else{
      res.write("Found:" + JSON.stringify(picker(user1[0],arrOfKeys)));
      user.find({ tHandle: req.params.tHandle2 }, function(error2, user2) {
        if(error2){
          res.status(404);
          res.write("User" + req.params.tHandle1 + "not found!" );
          res.end();
        }
        else{
          console.log("added to following:");
          res.write("Found:" + JSON.stringify(picker(user2[0],arrOfKeys)));
          // console.log(user2[0]._id);
          // console.log(typeof user2[0]._id);
          // console.log(typeof user2[0].id);
          // console.log(user1[0].following);
          // console.log(typeof user1[0].following);

          // console.log(_.contains(user1[0].following,user2[0].id));
          // var temp = user1[0].following;
          // var strArr = _.values(temp);
          // console.log(typeof strArr);
          // console.log(strArr);

          //console.log(_(user1[0].following).value());

          // if(_.contains(user1[0].following, user2[0].id)){
          //   res.write("\n Cannot follow same user twice!");
          //   res.end();
          //   return;
          // }

          user1[0].following.push(user2[0]._id);

          console.log("User1: " + user1[0].tHandle + "is following :" + user1[0].following);

          user2[0].followers.push(user1[0]._id);

          console.log("User2: " + user2[0].tHandle + "is being followed by :" + user2[0].followers);

          console.log(user2[0]);

          console.log(user2[0].tweets);

          console.log(_(user2[0].tweets).value());
          user1[0].tweets = user1[0].tweets.concat(user2[0].tweets);
          console.log(user1[0].tweets);
          //user1[0].tweets.push(user2[0].tweets._id);
          //user1[0].tweets.push(user2[0].retweet._id);

          //console.log(user2[0].followers);
          user1[0].save(function (err) {
            if (err) { 
              res.status(500);
              res.write("Rejected" + JSON.stringify(picker(user1[0],arrOfKeys)));
              res.end();          
            }
            else{
              res.write("\n User: " + user1[0].tHandle + "is following :" + user1[0].following);
              res.write("Accepted" + JSON.stringify(picker(user1[0],arrOfKeys)));
              res.end();          
            }
          });  
          user2[0].save(function (err) {
            if (err) { 
              res.status(500);
              res.write("Rejected" + JSON.stringify(picker(user2[0],arrOfKeys)));
              res.end();          
            }
            else{
              res.write("Accepted" + JSON.stringify(picker(user2[0],arrOfKeys)));
              res.end();          
            } 
          });
        } 
      });
    }
  });
}



exports.showFollowers = function(req,res){
  user.find({ tHandle: req.params.tHandle1 }, function(error1, user1) {
    if(error1){
      res.status(404);
      res.write("User" + req.params.tHandle1 + "not found!" );
      res.end();
    }
    else{
      res.write("Found the user." );
      res.write("\n Followers are :" + JSON.stringify(user1[0].followers));
      res.end();
      console.log("Followers are :" + user1[0].followers);

    }
  });
}


exports.showTweets = function(req,res){
  user.find({ tHandle: req.params.tHandle }, function(error1, user1) {
    if(error1){
      res.status(404);
      res.write("User" + req.params.tHandle + "not found!" );
      res.end();
    }
    else{
      res.write("Found the user." );
      res.write("\n Tweets are :" + JSON.stringify(user1[0].tweets));
      res.end();
      console.log("Tweets are :" + user1[0].tweets);

    }
  });
}



























 