const router = require("express").Router();
const { Media } = require("../models/Media");
const { message } = require("../messages");

router.get("/", async (req, res) => {
  try {
    const response = await Media.findAll();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send({ error : message.media.error });
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Media.findByPk(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send({ error : message.media.error })
  }
})

module.exports = router;