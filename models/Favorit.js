const mongoose = require('mongoose');

const Favorite = mongoose.model('Favorite', {
   name: String,
   description: {
      type: String,
   },
   image: {
      type: String,
   },
   characterId: String,
   userId: String,
});

module.exports = Favorite;
