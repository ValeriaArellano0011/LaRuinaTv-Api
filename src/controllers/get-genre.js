const router = require('express').Router();
const { message } = require('../messages');
const { Genre } = require('../models/Genre');

router.get("/", async (req, res) => {
    try {
        const genres = await Genre.findAll();
        return res.status(200).json({genres});
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const genre = await Genre.findByPk(id);
        return res.status(200).json(genre);

    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;