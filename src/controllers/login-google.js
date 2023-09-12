const express = require("express");
const router = express.Router();
const passport = require("passport");
const { User } = require("../models/User");
const { clientUrl } = require("../config");
const { createToken } = require("../integrations/jwt");
const { loginGoogle } = require("../integrations/google");

passport.use('login-google', loginGoogle);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get('/', passport.authenticate('login-google', { state: '200' }));

router.get('/callback', passport.authenticate('login-google', {
  successRedirect: `/auth/user/google/login/success`,
  failureRedirect: '/auth/user/google/login/failure'
}));

router.get('/success', async (req, res) => {
  try {
    const user = req.session.passport.user;
    const userExist = await User.findOne({ where: { email: user.email }});

    if (userExist) {
      const { id, status } = userExist;
      const data_login = { id, status }
      const token = await createToken(data_login, 3)
      console.log('token', token)

      return res.status(200).redirect(`${clientUrl}/auth?token=${token}`);

    } else {
      return res.status(400).redirect(`${clientUrl}/auth?token=none`);
    }
  } catch (error) {
    return res.status(400).redirect(`${clientUrl}/auth?token=none`);
  }
});

module.exports = router;