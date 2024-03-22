const express = require("express");
const router = express.Router();
const { addNewFileController } = require("../controllers/addNewFileController");
const { getFileDetails } = require("../controllers/getFileDetails");

router.post("/new/:directoryId", addNewFileController);
router.get("/getById/:fileId", getFileDetails);

module.exports = router;
