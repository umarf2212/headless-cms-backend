const mongoose = require("mongoose");
const connectDatabase = require("../db_connection/db_connect");

const Directory = require("../models/DirectorySchema");
const File = require("../models/FileSchema");

// Define a function to create directories recursively
async function createDirectoryStructure(parentDirectory, structure) {
  for (const folderName of Object.keys(structure)) {
    const folder = new Directory({ name: folderName, parentDirectory });
    await folder.save();

    if (parentDirectory) {
      parentDirectory.directories.push(folder._id);
      await parentDirectory.save(); // Save the parent directory
    }

    // Check if the current item is a subfolder
    if (
      typeof structure[folderName] === "object" &&
      !Array.isArray(structure[folderName])
    ) {
      // Recursively create subdirectories
      await createDirectoryStructure(folder, structure[folderName]);
    } else {
      // Create files within the current folder
      for (const fileName of structure[folderName]) {
        const file = new File({
          name: fileName,
          url: `https://example.com/${fileName}`,
          directory: folder._id,
        });
        await file.save();

        // Add the file to the directory's files array
        folder.files.push(file._id);
      }

      // Save the directory with the updated files array
      await folder.save();
      console.log("File structure created successfully.", folderName);
    }
  }
}

async function createFileStructure() {
  // Initiate DB connection
  await connectDatabase();

  // Define the file structure
  const fileStructure = {
    Folder1: {
      Subfolder1: ["file1.txt", "file2.txt"],
      Subfolder2: ["file3.txt"],
    },
    Folder2: ["file4.txt", "file5.txt"],
    Folder3: ["file6.txt", "file7.txt"],
  };

  const rootDirectory = new Directory({ name: "root" });
  await rootDirectory.save();

  await createDirectoryStructure(rootDirectory, fileStructure);

  // Close the MongoDB connection when done
  await mongoose.connection.close();
}

module.exports = createFileStructure;
