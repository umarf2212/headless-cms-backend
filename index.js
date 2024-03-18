const mongoose = require("mongoose");
const connectDatabase = require("./db_connection/db_connect");
const User = require("./models/UserSchema");

async function main() {
  await connectDatabase();

  // Example CRUD operations
  const newUser = new User({
    name: "John Doe",
    email: "john@example.com",
    age: 30,
  });
  await newUser.save();

  const users = await User.find({ age: { $gte: 25 } });
  console.log(users);

  // Close the MongoDB connection when done
  await mongoose.connection.close();
}

main();
