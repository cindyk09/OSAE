
var client=require('../../app');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var authenticationMiddleware = require('./middleware')
var current_key

function findUser (username,callback) {
  client.keys('*',function(err,keys){
    if (err) return console.log(err);

    for (var i = 0; i < keys.length; i++) {
      if (username === keys[i].username) {
        current_key=keys[i]
        return callback(null, user)
      }
      return callback(null)
    }
  });
}

passport.serializeUser(function (user, cb) {
  cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
  findUser(username, cb)
})

function initPassport () {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      findUser(username, function (err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false)
        }
        if (password !== user.password  ) {
          return done(null, false)
        }
        return done(null, user)
      })
    }
  ))

  passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport
