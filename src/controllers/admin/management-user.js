const router = require("express").Router();
const { message } = require("../../messages");
const { method, status } = require("../../misc/consts-user-model");
const { User } = require("../../models/User");
const bcrypt = require("bcrypt");

router.post("/create", async (req, res) => {
  try {
    const { username, email, password, profilePic, role } = req.body;

    const userData = {
      username,
      email,
      password,
      profilePic,
      role,
      status: status.active,
      isVerified: true,
      method: method.adminManagement,
      googleId: null,
      googlePic: null
    }

    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(password, salt);

    await User.create(userData);
    return res.status(200).json({ message: message.admin.createuser.success });
  } catch (error) {
    return res.status(500).send({ error : message.admin.createuser.error });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const existingUser = await User.findByPk(id);
    if (!existingUser) return res.status(404).json({ message: message.admin.updateuser.failure });

    const salt = await bcrypt.genSalt();
    body.password = await bcrypt.hash(body.password, salt);

    await User.update(body, {
      where: {
        id: id
      }
    });
    return res.status(200).json({ message: message.admin.updateuser.success });
  } catch (error) {
    return res.status(500).send({ error : message.admin.updateuser.error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await User.findByPk(id);
    if (!existingUser) return res.status(404).json({ message: message.admin.deleteuser.failure });

    await User.destroy({
      where: {
        id: id
      }
    });
    return res.status(200).json({ message: message.admin.deleteuser.success } );
  } catch (error) {
    return res.status(500).send({ error : message.admin.deleteuser.error });
  }
});

module.exports = router;