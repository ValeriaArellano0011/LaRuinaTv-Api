const router = require('express').Router();

const auth = require('../controllers/auth');
const user = require('../controllers/get-user');
const admin = require('../controllers/admin');
const media = require('../controllers/get-media');
const likes = require("../controllers/get-likes");
const account = require('../controllers/account');
const innerLogin = require('../controllers/login-inner');
const googlLogin = require('../controllers/login-google');
const mercadopago = require("../integrations/mercadopago.js");
const yt = require('../controllers/yt');
const category = require('../controllers/get-category')
const mediatype = require('../controllers/get-mediatype')
const genre = require('../controllers/get-genre')

router.use("/auth", auth);
router.use("/user", user);
router.use("/account", account);
router.use("/admin", admin);
router.use("/media", media);
router.use("/likes", likes);
router.use("/login-inner", innerLogin);
router.use("/login-google", googlLogin);
router.use('/category', category);
router.use('/mediatype', mediatype);
router.use('/genre', genre);

router.use("/mercadopago", mercadopago);
router.use('/yt', yt);

module.exports =  router;