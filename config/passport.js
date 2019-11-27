const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    // passReqToCallback   : true
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ 'email': profile.emails[0] }, function(err, user) {
      if (err) return cb(err);
      if (user) { //user logged in
        return cb(null, user);
      } else { // new user logged in save their data
        var newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newUser.save(function(err) {
          if (err) return cb(err);
          return cb(null, newUser);
        });
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});