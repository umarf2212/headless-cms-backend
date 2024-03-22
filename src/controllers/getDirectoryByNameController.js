const connectDatabase = require("../db_connection/db_connect");
const Directory = require("../models/DirectorySchema");
const mongoose = require("mongoose");

async function populateDirectory(directory) {
  await directory.populate("directories files");
  for (let i = 0; i < directory.directories.length; i++) {
    const subDirId = directory.directories[i];
    const subDir = await Directory.findById(subDirId);
    if (subDir) {
      directory.directories[i] = await populateDirectory(subDir);
    }
  }
  return directory;
}

exports.getDirectoryByName = async (req, res) => {
  const directoryName = req.params.name;
  try {
    await connectDatabase();
    const rootDirectory = await Directory.findOne({ name: directoryName });
    const populatedDirectory = await populateDirectory(rootDirectory);
    await mongoose.connection.close();
    res.json(populatedDirectory);

    // Close the MongoDB connection when done
    await mongoose.connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "500 Server error" });
  }
};
