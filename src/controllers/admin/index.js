const router = require("express").Router();
const media = require("./management-media");
const user = require("./management-user");
const category = require("./management-category");

router.use("/media", media);
router.use("/user", user);
router.use("/category", category)

module.exports = router;