var user = require('./user.js');
var tweet = require('./tweet.js');
 
exports.post = function(req, res) {
    new user({tHandle: req.body.tHandle, password: req.body.password}).save();
    res.write("Accepted" + this.user);
    res.end();
}
 
exports.list = function(req, res) {
  user.find(function(err, users) {
    res.write(users);
    res.end();
  });
}
 
exports.show = (function(req, res) {
    user.findOne({_id: req.params.id}, function(error, user) {
        var tweets = tweet.find({tweet: tweet._id}, function(error, tweets) {
          res.write(JSON.stringify([{user: user, tweets: tweets}]));
          res.end();
        });
    })
});