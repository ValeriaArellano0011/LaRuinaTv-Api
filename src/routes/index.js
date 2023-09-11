const router = require('express').Router();

const auth = require('../controllers/auth');
const user = require('../controllers/user.js');
const users = require('../controllers/users.js');
const media = require('../controllers/media');
const mercadopago = require("../integrations/mercadopago.js")
const likes = require("../controllers/likes")
const yt = require('../controllers/yt')

router.use("/auth", auth);
router.use('/user', user);
router.use('/users', users);
router.use('/yt', yt);
router.use("/media", media);
router.use("/likes", likes);
router.use("/mercadopago", mercadopago);

module.exports =  router;