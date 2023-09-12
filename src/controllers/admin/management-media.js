const router = require("express").Router();
const { message } = require("../../messages");
const { Media } = require("../../models/Media");

router.post("/create", async (req, res) => {
  try {
    const { body } = req;
    await Media.create(body);
    return res.status(200).json({ message: message.admin.createmedia.success });
  } catch (error) {
    return res.status(500).send({ error : message.admin.createmedia.error });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const existingMedia = await Media.findByPk(id);
    if (!existingMedia) return res.status(404).json({ message: message.admin.updatemedia.failure });

    

    await Media.update(body, {
      where: {
        id: id
      }
    });
    return res.status(200).json({ message: message.admin.updatemedia.success });
  } catch (error) {
    return res.status(500).send({ error : message.admin.updatemedia.error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const existingMedia = await Media.findByPk(id);
    if (!existingMedia) return res.status(404).json({ message: message.admin.deletemedia.failure });

    await Media.destroy({
      where: {
        id: id
      }
    });
    return res.status(200).json({ message: message.admin.deletemedia.success } );
  } catch (error) {
    return res.status(500).send({ error : message.admin.deletemedia.error });
  }
});

module.exports = router;