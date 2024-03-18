const express = require("express");
const router = express.Router();
const { addNewFile } = require("../controllers/addNewFileController");

router.get("/new/:directoryId", addNewFile);

module.exports = router;
