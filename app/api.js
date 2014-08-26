var user = require('./user.js');
var tweet = require('./tweet.js');
var _ = require('underscore');
var arrOfKeys = ['tHandle','tweets','following','followers'];

//var objId = require("mongodb").ObjectID

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
    if(error){
      res.status(504);
      res.write("User :" + req.params.tHandle + " not found!!");
      res.end();
    }
    else{
      var newTweet = new tweet({tweetBody  : req.body.tweetBody,
                              creator_id : users[0]._id});
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
    }
    
    //console.log(users[0]);
    //console.log("-----3------");
    //console.log(users);
  });
}


exports.addToFollowing = function(req,res){
  user.find({ tHandle: req.params.tHandle1 }, function(error1, user1) {
    if(error1){
      res.status(404);
      res.write("\n User " + req.params.tHandle1 + "not found!(also cannot follow self)" );
      res.end();
    }
    else{
      res.write("\n Found:" + JSON.stringify(picker(user1[0],arrOfKeys)));
      user.find({ tHandle: req.params.tHandle2 }, function(error2, user2) {
        if(error2){
          res.status(404);
          res.write("\n User" + req.params.tHandle1 + "not found!" );
          res.end();
        }
        else{
          console.log("\n Added to following:");
          res.write("\n Found:" + JSON.stringify(picker(user2[0],arrOfKeys)));
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

          console.log("\n User1: " + user1[0].tHandle + "is following :" + user1[0].following);

          user2[0].followers.push(user1[0]._id);

          console.log("\n User2: " + user2[0].tHandle + "is being followed by :" + user2[0].followers);

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
              res.write("\n Rejected" + JSON.stringify(picker(user1[0],arrOfKeys)));
              res.end();          
            }
            else{
              res.write("\n User: " + user1[0].tHandle + "is following :" + user1[0].following);
              res.write("\n Accepted" + JSON.stringify(picker(user1[0],arrOfKeys)));
              res.end();          
            }
          });  
          user2[0].save(function (err) {
            if (err) { 
              res.status(500);
              res.write("\n Rejected" + JSON.stringify(picker(user2[0],arrOfKeys)));
              res.end();          
            }
            else{
              res.write("\n Accepted" + JSON.stringify(picker(user2[0],arrOfKeys)));
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

exports.doRetweet = function(req,res){
  user.find({tHandle: req.params.tHandle1}, function(error1, user1){
    if(error1){
      res.status(404);
      res.write("User :" + req.params.tHandle1 + "not found!!");
      res.end();
    }
    else{
      user.find({ tHandle : req.params.tHandle2}, function(error2, user2){
        if(error2){
          res.status(404);
          res.write("User :" + req.params.tHandle1 + "not found!!");
          res.end();
        }
        else{
          var present = _.filter(user1[0].following, function(val){ return val.equals(user2[0]._id)});
          console.log(present);
          //console.log(present[0].equals(user2[0]._id));
          res.write("Both users found.")
          //res.end();
          if (typeof present !== 'undefined' && present.length > 0) {
            // the array is defined and has at least one element
            res.write("\n User1 :" + req.params.tHandle1 + "is following : " + req.params.tHandle2);
            res.end();
          }
          else{
            res.status(412);
            res.write("User1 needs to be following user2 to perform retweet!");
            res.end();
          }
        }
      });
    }
  });
    user.find({tHandle: req.params.tHandle1},function(error3,users1){
      if(error3){
        res.status(504);
        res.write("No users found!");
        res.end();
        }
      else{
        console.log("!!!!!!!");
        //console.log(users);
        //console.log(users[0].followers);
        tweet.find({_id : req.params.tweetId}, function(error4, foundTweet){
        var tempArray1=[];
        if(error4){
          res.status(404);
          res.write("Tweet not found!");
          res.end();
        }
        else{
          foundTweet.reTweetCount++;
          console.log("111111");
          //console.log(users);
          console.log(users1[0].followers); //array of _id's
          console.log(foundTweet); 
          console.log(typeof foundTweet);
          console.log("\n ::");
          console.log(foundTweet[0]._id);         
          for(var i=0;i<users1[0].followers.length;i++){
            tempArray1.push(users1[0].followers[i]);
          }  
          console.log("\n tempArray: ");
          console.log(tempArray1);
          user.find({_id: { $in: tempArray1} },function(err, followers){
            if(err){
              res.status(404);
              res.write("No tweets found!");
              res.end();
            }
            else{
              console.log("------");
              //console.log("\n Followers:" + followers);
              //console.log("\n Followers tweets: " + followers.tweets);
              console.log(typeof followers);
              //console.log(followers);
              console.log(followers[0].tweets);
              console.log(followers[1].tweets);
              for(var i=0;i<users1[0].followers.length;i++){
                followers[i].tweets.push(foundTweet[0]._id);
              }
              console.log("\n Next:");
              console.log(followers[0].tweets);
              console.log(followers[1].tweets);
              console.log(followers[0]);
              console.log(followers[1]); 
              followers.save(function (err) {
                if (err) { 
                  res.status(500);
                  res.write("\n Rejected" + JSON.stringify(picker(followers[0],arrOfKeys)));
                  res.end();          
                }
                else{
                  res.write("\n Accepted" + JSON.stringify(picker(followers[0],arrOfKeys)));
                  res.end();          
                } 
              }); 
            }
          });
        }
      });
    }
  });  
  
  //});
}

// for(var i=0;i<users[0].tweets.length;i++){
//         tempArray.push(users[0].tweets[i]._id);
//       }  
//       tweet.find({_id: { $in: tempArray} },function(err, found){
//         if(err){
//           res.status(404);
//           res.write("No tweets found!");
//           res.end();
//         }

























 