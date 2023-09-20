const router = require("express").Router();
const media = require("./management-media");
const user = require("./management-user");
const category = require("./management-category");
const mediatype = require("./management-mediatype");
const genre = require("./management-genre");

router.use("/media", media);
router.use("/user", user);
router.use("/category", category)
router.use("/mediatype", mediatype)
router.use("/genre", genre)

module.exports = router;