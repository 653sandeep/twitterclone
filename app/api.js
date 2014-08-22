var user = require('./user.js');
var tweet = require('./tweet.js');
 
exports.create = function(req, res) {
  var saved = new user({tHandle: req.body.tHandle, password: req.body.password});
  saved.save(function (err) {
    if (err) { 
      res.status(422);
      res.write("Rejected" + saved);
      res.end();          
    }
    else{
      res.write("Accepted" + saved);
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
      res.write(JSON.stringify(users));
      res.end();
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
          res.write("Accepted" + newTweet);
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
        res.write("Rejected" + newTweet);
        res.end(); 
      }  
    });          
    users[0].tweets.push(newTweet);
    users[0].save(function (err) {
        if (err) { 
          res.status(422);
          res.write("Rejected" + users[0]);
          res.end();          
        } 
      });
    console.log(users[0]);
    console.log("-----3------");
    console.log(users);
  });
}


exports.addToFollowing = function(req,res){
  user.find({ tHandle: req.params.tHandle1 }, function(error1, user1) {
    if(error1){
      res.status(404);
      res.write("User" + req.params.tHandle1 + "not found!" );
      res.end();
    }
    else{
      res.write("Found:" + user1);
      user.find({ tHandle: req.params.tHandle2 }, function(error2, user2) {
        if(error2){
          res.status(404);
          res.write("User" + req.params.tHandle1 + "not found!" );
          res.end();
        }
        else{
          console.log("222");
          res.write("Found:" + user2);
          user1[0].following.push(user2[0]._id);
          console.log(user1[0].following);
          user1[0].save(function (err) {
            if (err) { 
              res.status(500);
              res.write("Rejected" + user1);
              res.end();          
            }
            else{
              res.write("Accepted" + user1);
              res.end();          
            }
          });
        }
      });
    }
  });
}
  // saver.save(function (err) {
  //       if (err) { 
  //         res.status(422);
  //         res.write("Rejected" + saver);
  //         res.end();          
  //       }
  //       else{
  //           res.write("Saved" + saver);
  //           res.end();  
  //         }
  //     });
  //this.user.tweets.push(newTweet);
 //});   



// user.find({ tHandle: req.params.tHandle }, function(error, user) {
//     if(error){
//       res.status(404);
//       res.write(" User: " + req.params.tHandle + " not found!");
//       res.end();
//     }
//     else{
//       console.log(user[0].tweets[0]);
//       console.log("--------------");
//       console.log(user[0].tweets[1]);
//       console.log(user[0].tweets.length);
//       for(i=0;i<user[0].tweets.length;i++){
//         tweet.find({_id: user[0].tweets[i]}, function(error, tweets) {
//           if(error){
//             res.status(404);
//             res.write("No tweets found!");
//             res.end();
//           }
//           else{
//             console.log(typeof tweets);
//             console.log(tweets[0].tweetBody);
//             var temp1 = JSON.stringify(user);
//             var temp2 = JSON.stringify(tweets);

//             res.write("User:" + temp1 + "\n" + "Tweets:" + temp2);
//             res.end();
//           }
//         });
//       } 
//     }  
//   })
// };