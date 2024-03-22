const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  directory: { type: mongoose.Schema.Types.ObjectId, ref: "Directory" },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
