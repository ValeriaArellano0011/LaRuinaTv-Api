const router = require("express").Router();
const { decodeToken } = require("../../integrations/jwt");
const { message } = require("../../messages");
const { roles } = require("../../misc/consts-user-model");
const { Genre } = require("../../models/Genre");

router.post("/create", async (req, res) => {
  const { body } = req;
  try {
    // const userToken = req.headers.authorization;
    // if (!userToken) return res.status(403).json({ message: message.admin.permissionDenied });

    // const decodedToken = await decodeToken(userToken);
    // if (decodedToken?.data?.role !== roles.admin) return res.status(403).json({ message: message.admin.permissionDenied });

    await Genre.create(body);
    return res.status(200).json({ message: message.genre.successful })
  } catch (error) {
    return res.status(500).json({ message: message.genre.error });
  }
});

router.patch("/update/:id", async (req, res) => {

  try {
    const { id } = req.params;
    const { body } = req;

    await Genre.update(body, { where: { id: id } });

    return res.status(200).json({ message: message.update.success });

  } catch (error) {
    return res.status(500).json({ message: message.update.error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Genre.destroy({ where: { id } });
    return res.status(200).json({ message: message.delete.success });
  } catch (error) {
    return res.status(500).json({ message: message.delete.error });
  }
});

module.exports = router;