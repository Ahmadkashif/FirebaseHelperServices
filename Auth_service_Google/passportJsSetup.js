const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "694374768925-ba687fhm7gujbps9p4ga6s04aop6haof.apps.googleusercontent.com",
    clientSecret: "Flvu_OEOuDOU1cTT9k10Kdr0",
    callbackURL: "http://localhost:4000/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
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