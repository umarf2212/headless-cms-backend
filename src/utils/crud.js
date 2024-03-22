const mongoose = require("mongoose");

// Create Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// Create Model
const User = mongoose.model("User", userSchema);

// Create (Insert)
const newUser = new User({
  name: "John Doe",
  email: "john@example.com",
  age: 30,
});
newUser.save();

// Read (Query)
User.find({ age: { $gte: 25 } }).exec((err, users) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(users);
});

// Update
User.updateOne({ name: "John Doe" }, { age: 31 }, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result);
});

// Delete
User.deleteOne({ name: "John Doe" }, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("User deleted successfully");
});
