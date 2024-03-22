const mongoose = require("mongoose");
const connectDatabase = require("../db_connection/db_connect");

const Directory = require("../models/DirectorySchema");
const File = require("../models/FileSchema");

exports.addNewFileController = async (req, res) => {
  const directoryId = req.params.directoryId;

  const { name, url } = req.body; // Assuming name and url of the file are passed in the request body
  // const name = `someFile_${Math.floor(Math.random() * 1000)}.txt`;
  // const url = "https://google.com/";

  try {
    await connectDatabase();
    // Find the directory by its ID
    const directory = await Directory.findById(directoryId);

    if (!directory) {
      return res.status(404).json({ message: "Directory not found" });
    }

    // Create a new file document
    const newFile = new File({
      name,
      url,
      directory: directoryId,
    });

    // Save the file to the directory
    await newFile.save();

    // Add the file to the directory's files array
    directory.files.push(newFile._id);
    await directory.save();

    res
      .status(201)
      .json({ message: `File added successfully: ${newFile.name}` });

    // Close the MongoDB connection when done
    await mongoose.connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "500 Server error" });
  }
};
