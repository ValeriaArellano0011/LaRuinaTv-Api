const router = require("express").Router();
const media = require("./management-media");
const user = require("./management-user");

router.use("/media", media);
router.use("/user", user);

module.exports = router;