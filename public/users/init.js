var passport = require('passport');
var path = require('path');

function initUser (app) {
  app.get('/welcome', renderWelcome)
  app.get('/profile', passport.authenticationMiddleware(), renderProfile)
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/welcome'
  }))
}

function renderWelcome (req, res) {
  res.render(path.join(__dirname,'welcome.ejs'));
}

function renderProfile (req, res) {
  res.render(path.join(__dirname,'profile.ejs'), {
    username: req.user.username
  })
}

module.exports = initUser
