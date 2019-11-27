const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const router = express.Router();


const GoogleStrategy = require('passport-google-oauth20').Strategy;
const logger = require('morgan');
require('dotenv').config();

//connect to mongodb
require('./config/database');
require('./config/passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'SEIRocks!',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/logout', function(req, res){
  req.logout();
  console.log('logged out.......................')
  res.redirect('/');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

//   /////////  oauth 2 ///////////////
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

  //'/auth/google/callback'
app.get('/oauth2callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    console.log('logged in Yay!!!!!!!!!!!!!!!!!')
    // Successful authentication, redirect home.
    res.redirect('/');
  });


  // router.get('/oauth2callback', passport.authenticate(
  //   'google',
  //   {
  //     successRedirect : '/index',
  //     failureRedirect : '/index'
  //   }
  // ));

//////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
