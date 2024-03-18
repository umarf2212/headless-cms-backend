const connectDatabase = require("../db_connection/db_connect");
const Directory = require("../models/DirectorySchema");
const mongoose = require("mongoose");

exports.createDirectory = async (req, res) => {
  const targetDirectoryId = req.params.targetDirectoryId;
  const newDirectoryName = req.params.newDirectoryName;

  try {
    // Find the target directory by its ID
    await connectDatabase();

    const targetDirectory = await Directory.findById(targetDirectoryId);
    if (!targetDirectory) {
      return res.status(404).json({ message: "Target directory not found" });
    }

    // Create a new directory document
    const newDirectory = new Directory({
      name: newDirectoryName,
      parentDirectory: targetDirectoryId,
    });

    // Save the new directory
    await newDirectory.save();

    // Add the new directory to the target directory's directories array
    targetDirectory.directories.push(newDirectory._id);
    await targetDirectory.save();

    res.status(201).json({ message: "Directory added successfully" });

    // Close the MongoDB connection when done
    await mongoose.connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "500 Server error" });
  }
};
