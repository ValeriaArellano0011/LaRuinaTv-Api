const router = require("express").Router();
const { decodeToken } = require("../../integrations/jwt");
const { message } = require("../../messages");
const { roles } = require("../../misc/consts-user-model");
const { Category } = require("../../models/Category");

router.post("/create", async (req, res) => {
  const { body } = req;
  try {
    const userToken = req.headers.authorization;
    if (!userToken) return res.status(403).json({ message: message.admin.permissionDenied });

    const decodedToken = await decodeToken(userToken);
    if (decodedToken?.data?.role !== roles.admin) return res.status(403).json({ message: message.admin.permissionDenied });

    await Category.create(body);
    
  } catch (error) {
    return res.status(500).json({ message: message.category.error }); 
  }
});

router.patch("/update/:id", async (req, res) => {

});

router.delete("/delete/:id", async (req, res) => {

});

module.exports = router;