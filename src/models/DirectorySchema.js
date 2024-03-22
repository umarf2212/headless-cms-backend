const mongoose = require("mongoose");

// Define schema for directories
const directorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentDirectory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Directory",
    default: null,
  },
  directories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Directory" }],
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
});

const Directory = mongoose.model("Directory", directorySchema);

module.exports = Directory;
