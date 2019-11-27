const User = require('../models/user');
const passport = require('passport');


module.exports = {
  index,
  auth,
  authCB,
  logOut,
}

function index(req, res, next) {
  console.log(req.user)
  res.render('index', { 
    title: 'Dashboard',
    user: req.user,
    name: req.query.name,
   });
}

function auth(req, res, next) {
  passport.authenticate(
    'google', { scope: ['profile','email'] })
  };

function authCB(req, res, next) {
  passport.authenticate('google',
    {
      successRedirect : '/users/new',
      failureRedirect : '/users/new'
    }
  )};

  function logOut(req, res){
    req.logout();
    res.redirect('/users');
  };