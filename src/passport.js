const passport = require('passport');
const { authClientId, authClientSecret } = require('./config');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
  
passport.deserializeUser(function(user, done) {
  done(null, user);
  
});
passport.serializeUser((user, done) => {
  done(null, user);
});
  
passport.use(new GoogleStrategy({
    clientID: authClientId,
    clientSecret: authClientSecret,
    callbackURL: `https://laruinatv-api.fly.dev/auth/google/callback`,
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, { ...profile, accessToken });
  }
));

module.exports = passport;