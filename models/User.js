const mongoose = require('mongoose');

const User = mongoose.model({
   email: { type: String, required: true, unique: true },
   password: { type: String, required: ture, unique: true },
   token: String,
   hash: String,
   salt: String,
   favorites: {
      characters: array,
      comics: array,
   },
});

module.exports = User;
