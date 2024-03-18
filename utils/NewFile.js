const Directory = require("../models/DirectorySchema");
const File = require("../models/FileSchema");

// Parent Directory will be given from url params
// Creating a new directory
// const newDirectory = new Directory({ name: "Folder1" });
// await newDirectory.save();

// Creating a new file
async function addNewFile(directory) {
  const newFile = new File({
    name: "file1.txt",
    url: "https://example.com/file1.txt",
    directory: directory._id,
  });
  await newFile.save();

  // Adding files to a directory
  directory.files.push(newFile._id);
  await directory.save();
}
export default addNewFile;
