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