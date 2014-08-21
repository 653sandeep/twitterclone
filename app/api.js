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
    res.write(JSON.stringify(users));
    res.end();
  });
}
 
exports.show = (function(req, res) {
    user.find({ tHandle: req.params.tHandle }, function(error, user) {
        var tweets = tweet.find({tweet: tweet._id}, function(error, tweets) {
          res.write(JSON.stringify([{user: user, tweets: tweets}]));
          res.end();
        });
    })
});

exports.createTweet = function(req,res){
  user.find({ tHandle: req.params.tHandle }).populate('tweetz').exec(function(error, users){
    var newTweet = new tweet({body : req.body.body});
    newTweet.save(function(err){
      if(!err){
        if(JSON.stringify(newTweet.body).length<=140){
          res.write("Accepted" + newTweet);
          res.end();  
        }
      }
      else{
        res.status(413);
        res.write("Tweet exceeds 140 chars");
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
    //console.log(users[0]);
    //console.log("-----3------");
    //console.log(users);
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