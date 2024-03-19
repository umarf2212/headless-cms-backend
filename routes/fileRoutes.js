const express = require("express");
const router = express.Router();
const { addNewFileController } = require("../controllers/addNewFileController");

router.post("/new/:directoryId", addNewFileController);

module.exports = router;
