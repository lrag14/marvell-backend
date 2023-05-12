const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  account: {
    username: {
      type: String,
      required: true,
    },
  },
  token: String,
  hash: String,
  salt: String,
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
