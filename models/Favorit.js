const mongoose = require('mongoose');

const Favorite = mongoose.model({
   user: {
      type: mongoose.Schema.Types.ObjectId, //RECUPERE ID USER
      ref: 'User',
   },
   characterId: Number,
   comicId: Number,
});

module.exports = Favorite;
