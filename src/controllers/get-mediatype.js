const router = require('express').Router();
const { message } = require('../messages');
const { Mediatype } = require('../models/Mediatype');

router.get("/", async (req, res) => {
    try {
        const mediatypes = await Mediatype.findAll();
        return res.status(200).json({mediatypes});
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const mediatype = await Mediatype.findByPk(id);
        return res.status(200).json(genre);

    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;