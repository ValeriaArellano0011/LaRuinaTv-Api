const router = require("express").Router();
const { idVisorFolder, idSliderFolder } = require("../../config");
const { saveImageToDrive } = require("../../integrations/google-drive");
const { decodeToken } = require("../../integrations/jwt");
const { message } = require("../../messages");
const { roles } = require("../../misc/consts-user-model");
const { Media } = require("../../models/Media");

router.post("/create", async (req, res) => {
  const userToken = req.headers.authorization;
  if (!userToken) return res.status(403).json({ message: message.admin.permissionDenied });

  const decodedToken = await decodeToken(userToken);
  if (decodedToken?.data?.role !== roles.admin) return res.status(403).json({ message: message.admin.permissionDenied });

  try {
    const { body } = req;
    const { imageVisor, imageSlider, artist, title } = body;

    console.log(body)

    if (imageSlider) {
      const filename = artist + "_" + title + "_" + "slider";
      const responseSlider = await saveImageToDrive(imageSlider, idSliderFolder, filename);
      console.log(responseSlider)
      body.imageSlider = responseSlider;
    };

    if (imageVisor) {
      const filename = artist + "_" + title + "_" + "visor";
      const responseVisor = await saveImageToDrive(imageVisor, idVisorFolder, filename);
      console.log(responseVisor)
      body.imageVisor = responseVisor;
    };

    await Media.create(body);
    return res.status(200).json({ message: message.admin.createmedia.success });
  } catch (error) {
    return res.status(500).send({ error: message.admin.createmedia.error });
  }
});

router.patch("/update/:id", async (req, res) => {
  const userToken = req.headers.authorization;
  if (!userToken) return res.status(403).json({ message: message.admin.permissionDenied });

  const decodedToken = await decodeToken(userToken);
  if (decodedToken.data.role !== roles.admin) return res.status(403).json({ message: message.admin.permissionDenied });

  try {
    const { id } = req.params;
    const { body } = req;

    const existingMedia = await Media.findByPk(id);
    if (!existingMedia) return res.status(404).json({ message: message.admin.updatemedia.failure });

    await Media.update(body, {
      where: {
        id: id
      }
    });
    return res.status(200).json({ message: message.admin.updatemedia.success });
  } catch (error) {
    return res.status(500).send({ error: message.admin.updatemedia.error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const userToken = req.headers.authorization;
  if (!userToken) return res.status(403).json({ message: message.admin.permissionDenied });

  const decodedToken = await decodeToken(userToken);
  if (decodedToken.data.role !== roles.admin) return res.status(403).json({ message: message.admin.permissionDenied });

  try {
    const { id } = req.params;

    const existingMedia = await Media.findByPk(id);
    if (!existingMedia) return res.status(404).json({ message: message.admin.deletemedia.failure });

    await Media.destroy({
      where: {
        id: id
      }
    });
    return res.status(200).json({ message: message.admin.deletemedia.success });
  } catch (error) {
    return res.status(500).send({ error: message.admin.deletemedia.error });
  }
});

module.exports = router;