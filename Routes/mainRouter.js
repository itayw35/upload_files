const express = require("express");
const router = express.Router();

router.use("/files", require("./filesRouter"));

module.exports = router;
