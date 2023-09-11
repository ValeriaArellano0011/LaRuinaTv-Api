const router = require('express').Router();
const passport = require('passport');
const { User } = require('../models/User');

router.get('/laruina/tv/callback/success', async (req, res) => {
  const referer = 'https://tv.laruinarecords.cl';

  if (!req.user) {
      res.redirect(`${referer}/auth/callback/failure`);
  }
  const accessToken = req.user.accessToken;
  const existingUser = await User.findOne({
      where: {
          email: req.user.emails[0].value,
      }
  });
  
  if (existingUser) {
      await User.update(
          { token: req.user.accessToken },
          { where: { email: req.user.emails[0].value, } }
      )
      return res.redirect(`${referer}/auth?token=${accessToken}`)
  }
  await User.create({
      alias: req.user.name.givenName,
      email: req.user.emails[0].value,
      googleId: req.user.id,
      method: 'google',
      isVerified: true,
      token: req.user.accessToken,
      role: req.user.emails[0].value === 'valearellano14@gmail.com' || req.user.emails[0].value ===  'terminalkillerproject@gmail.com' ||req.user.emails[0].value === 'lalofreak.jsx@gmail.com' || req.user.emails[0].value === 'lalofreak.dev@gmail.com' ? JSON.stringify({ role: 'admin', userMode: 'admin' }) : JSON.stringify({ role: 'common_user', userMode: 'free' }),
      googlePic: req.user.photos[0].value,
  });
  return res.redirect(`${referer}/auth?token=${accessToken}`)
});


router.get('/callback/failure', (req, res) => {
  res.send("Error");
});

router.get('/', passport.authenticate('google', {
  scope: [
          'email',
          'profile', 
          'https://www.googleapis.com/auth/userinfo.email', 
          'https://www.googleapis.com/auth/userinfo.profile', 
          'https://www.googleapis.com/auth/plus.me'
      ],
      accessType: 'offline'
}));

router.get('/google/callback',
  passport.authenticate('google', {
      successRedirect: `/auth/laruina/tv/callback/success`,
      failureRedirect: '/auth/callback/failure'
  })
);


module.exports = router;