const Directory = require("../models/DirectorySchema");
const File = require("../models/FileSchema");

// Creating a new directory
const newDirectory = new Directory({ name: "Folder1" });
await newDirectory.save();

// Creating a new file
const newFile = new File({
  name: "file1.txt",
  url: "https://example.com/file1.txt",
  directory: newDirectory._id,
});
await newFile.save();

// Adding files to a directory
newDirectory.files.push(newFile._id);
await newDirectory.save();

// Listing files in a directory
const filesInDirectory = await File.find({ directory: newDirectory._id });

console.log(filesInDirectory);

// Deleting a directory
// await Directory.findByIdAndDelete(newDirectory._id);
