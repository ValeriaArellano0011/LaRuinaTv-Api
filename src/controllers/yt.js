
const express = require("express");
const { getSubscribers } = require("../integrations/google-youtube");
const router = express.Router();

router.use("/subs", async (req, res) => {
  try {
    const response = await getSubscribers();
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({error: "Error"});
  }
});

module.exports = router;
