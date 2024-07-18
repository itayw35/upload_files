const express = require("express");
const router = express.Router();
const multer = require("multer");
const filesLogic = require("../BL/filesLogic");
const upload = multer();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const uploadedFile = await filesLogic.uploadFile(
      req.file.buffer,
      req.file.size,
      req.query.path,
      req.body
    );
    res.status(uploadedFile.code).send(uploadedFile.message);
  } catch (err) {
    console.error(err.message);
    res.status(err.code).send(err.message);
  }
});
router.post("/create-folder", async (req, res) => {
  try {
    const folder = await filesLogic.createFolder(req.body);
    res.status(folder.code).send(folder.message);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});
module.exports = router;
