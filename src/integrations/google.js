const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { authClientId, authClientSecret, apiUrl } = require("../config/");

const loginGoogle = new GoogleStrategy(
  {
    clientID: authClientId,
    clientSecret: authClientSecret,
    callbackURL: `${apiUrl}/login-google/callback`,
    scope: [
      'email',
      'profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/plus.me'
    ],
    accessType: 'offline'
  }, function (accessToken, refreshToken, profile, done) {
    process.nextTick(async function () {
      try {
        const googleData = {
          name: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
          accessToken: accessToken,
        }
        return done(null, googleData);
      } catch (err) {
        return done(err);
      }
    });
});

const signupGoogle = new GoogleStrategy(
  {
    clientID: authClientId,
    clientSecret: authClientSecret,
    callbackURL: `${apiUrl}/signup-google/callback`,
    scope: [
      'email',
      'profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/plus.me'
    ],
    accessType: 'offline'
  }, function (accessToken, refreshToken, profile, done) {
    process.nextTick(async function () {
      try {
        const userData = {
          name: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
          accessToken: accessToken,
        }
        return done(null, userData);
      } catch (err) {
        return done(err);
      }
    });
});

module.exports = {
  loginGoogle,
  signupGoogle,
};