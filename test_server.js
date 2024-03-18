const express = require("express");
const app = express();
const PORT = 8000; // You can change the port if needed

const createFileStructure = require("./utils/CreateFileStructure");

const directoryRoutes = require("./routes/directoryRoutes");
const fileRoutes = require("./routes/fileRoutes");

// Dummy Test Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/create-file-structure", async (req, res) => {
  createFileStructure();
  res.send("File structure creation complete");
});

app.use("/api/directory", directoryRoutes);
app.use("/api/file", fileRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
