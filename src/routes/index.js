const router = require('express').Router();

const auth = require('../controllers/auth');
const admin = require('../controllers/admin');
const user = require('../controllers/get-user');
const media = require('../controllers/get-media');
const likes = require("../controllers/get-likes");
const innerLogin = require('../controllers/login-inner');
const googlLogin = require('../controllers/login-google');
const mercadopago = require("../integrations/mercadopago.js");
const yt = require('../controllers/yt');

router.use("/auth", auth);
router.use("/user", user);
router.use("/admin", admin);
router.use("/media", media);
router.use("/likes", likes);
router.use("/login-inner", innerLogin);
router.use("/login-google", googlLogin);

router.use("/mercadopago", mercadopago);
router.use('/yt', yt);

module.exports =  router;