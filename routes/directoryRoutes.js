const express = require("express");
const router = express.Router();
const { createDirectory } = require("../controllers/createDirectoryController");
const {
  getDirectoryByName,
} = require("../controllers/getDirectoryByNameController");

// Route to add a new directory to a specific target directory
router.get(
  "/:targetDirectoryId/addDirectory/:newDirectoryName",
  createDirectory
);

router.get("/:name", getDirectoryByName);

module.exports = router;
