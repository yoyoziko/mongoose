var mongoose = require('mongoose');
var cfenv = require("cfenv");
var Schema   = mongoose.Schema;

var User = new Schema({
  username: String,
  password: String,
});

mongoose.model('User', User);

// Default Mongo URI is local
const DOCKER = process.env.DOCKER
if ( DOCKER === '1') {
  var mongoUri = 'mongodb://localhost:27017';
} else {
  var mongoUri = 'mongodb://localhost:27017';
}


if (process.env.MONGOLAB_URI) {
  // Generic (plus Heroku) env var support
  mongoUri = process.env.MONGOLAB_URI;
}
console.log("Using Mongo URI " + mongoUri);

mongoose.connect(mongoUri);

User = mongoose.model('User');
User.find({ username: 'admin' }).exec(function (err, users) {
  console.log(users);
  if (users.length === 0) {
    console.log('no admin');
    new User({ username: 'admin', password: Math.random() }).save(function (err, user, count) {
        if (err) {
          console.log('error saving admin user');
        }
      });
  }
});
