const express = require("express");
const router = express.Router();
const passport = require("passport");
const { User } = require("../models/User");
const { signupGoogle } = require("../integrations/google");
const { message } = require("../messages");
const { createToken } = require("../integrations/jwt");
const { clientUrl, defaultPassword } = require("../config");
const { status, methods, roles } = require("../misc/consts-user-model");

passport.use('signup-google', signupGoogle);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get('/', passport.authenticate('signup-google', { state: '200' }));

router.get('/callback', passport.authenticate('signup-google', {
  successRedirect: '/signup-google/success',
  failureRedirect: '/signup-google/failure'
}));

router.get('/failure', (req, res) => {
  return res.status(400).redirect(`${clientUrl}/#/user/register`);
});

router.get('/success', async (req, res) => {
  try {
    const user = req.session.passport.user;
    const existingUser = await User.findOne({ where: { email: user.email }});

    if (existingUser) {
      const errorToken = { error: true, isExpert: false, msg: message.signup.existinguser }
      const token = await createToken(errorToken, 3);
      return res.status(200).redirect(`${clientUrl}/#/auth?token=${token}`);
    }

    const userData = {
      username: user.username,
      password: defaultPassword,
      email: user.email,
      profilePic: null,
      isVerified: true,
      method: methods.inner,
      googleId: null,
      googlePic: user.photo ?? null,
      role: roles.freemium,
      status: status.active,
    };

    const userCreated = await User.create(userData);
  
    const tokenData = {
      id: userCreated.id,
      role: userCreated.role,
    };
    
    const token = await createToken(tokenData, 3);

    return res.status(200).redirect(`${clientUrl}/#/auth?token=${token}`);

  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;