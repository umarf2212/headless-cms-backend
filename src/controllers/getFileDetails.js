const connectDatabase = require("../db_connection/db_connect");
const File = require("../models/FileSchema");
const mongoose = require("mongoose");

exports.getFileDetails = async (req, res) => {
  const fileId = req.params.fileId;

  try {
    await connectDatabase();
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    await mongoose.connection.close();

    res.status(200).json(file);
  } catch (error) {
    console.error(error);
    res.json({ message: "500 internal server error" });
  }
};
