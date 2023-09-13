const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const { message } = require("../messages");
const { status, roles, methods } = require("../misc/consts-user-model");

router.post('/', async (req, res) => {
  try {
    const user = req.body;
    const existingUser = await User.findOne({ where: { email: user.email } });
    
    if(existingUser) {
      const errorToken = { error: message.signup.existinguser }
      return res.status(200).send({errorToken});
    };
    
    const userData = {
      username: user.username,
      password: user.password,
      email: user.email,
      profilePic: user.profilePic,
      status: status.inactive,
      isVerified: false,
      method: methods.inner,
      role: roles.freemium,
      googleId: null,
      googlePic: null
    };

    
    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(user.password, salt);
    
    await User.create(userData);
    return res.status(200).send({msg: message.signup.success});

  } catch (error) {
    return res.status(400).send({error: message.signup.error});
  };
});

module.exports = router;