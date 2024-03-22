// require("dotenv").config();
const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://prologic313:yxmQS1QDXeVp3gga@headless-cms-db.jhgrke7.mongodb.net/?retryWrites=true&w=majority&appName=headless-cms-db&ssl=true",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectDatabase;
