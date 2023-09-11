const router = require("express").Router();
const { Likes } = require("../models/Likes.js");
const { listPostVisorImages, listPostImages } = require('../helpers/media.js');

router.post("/add", async (req, res) => {
    const { urlId, idUser } = req.body;
    try {
        const like = await Likes.findOne({
            where: {
                urlId: urlId,
                userId: idUser
            },
            attributes: ['liked']
        })
        
        if (!like) {
            const newLike = await Likes.create({
                userId: idUser,
                urlId: urlId,
                liked: true
            })
            
            console.log(newLike)
            return res.status(200).json(newLike)
        }
        if (like.liked) {
            await Likes.destroy({ where: { urlId: urlId, userId: idUser } })
            return res.status(200).json("dislike")
        }
        // if (!contentLikes[contentId]) {
            //   contentLikes[contentId] = 0;
            // }
            // contentLikes[contentId] += 1;
            
            // res.status(200).send({ message: 'Me gusta agregado', likes: contentLikes[contentId] });
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
        
    });
router.post("/getAll", async (req, res) => {
    const { userId } = req.body
    try {
        const allLikes = await Likes.findAll({
            where: {
                userId: userId
            }
        })
        console.log(allLikes)
        if (allLikes.length) {
            //visor
            const responsesVisor = await listPostVisorImages()
            const resolvedResponsesVisor = await Promise.all(responsesVisor)
            const flattenResponsesVisor = Array.prototype.concat.apply([], resolvedResponsesVisor)
            const uniqueResponsesVisor = Array.from(new Set(flattenResponsesVisor));
            
            //filter it
            const arroflikes = allLikes.map((like) => { return uniqueResponsesVisor.filter(slide => { return slide.id === like.urlId }) })
            return res.status(200).json(arroflikes)
        }
        else{
            return res.status(200).json(allLikes)        
        }
        
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;