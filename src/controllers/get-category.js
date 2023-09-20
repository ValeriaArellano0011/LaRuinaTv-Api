const router = require('express').Router();
const { message } = require('../messages');
const { Category } = require('../models/Category');

router.get("/", async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).json({categories});
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByPk(id);
        return res.status(200).json(category);

    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;