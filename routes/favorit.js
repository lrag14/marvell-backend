const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const isAuthenticated = require('../middleswares/isAuthenticated.js');

// **************jouter un favori à un utilisateur
router.post('/user/favorites', isAuthenticated, async (req, res) => {
   try {
      const { userId, favoriteId } = req.body;
      // ********Cherche ID Utilisateur
      const user = await User.findById(userId);
      // *********PUSH Nouveau favori de l'ID
      user.favorites.push(favoriteId);
      // *******Sauvegarde
      await user.save();

      // Envoi la réponse*****************
      res.status(200).json({ message: 'Favori ajouté avec succès' });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

// Route pour supprimer un favori d'un utilisateur
router.post('/user/favorites', isAuthenticated, async (req, res) => {
   try {
      const { userId, favoriteId } = req.body;
      const user = await User.findById(userId);
      user.favorites = user.favorites.filter((id) => id !== favoriteId);
      await user.save();
      res.status(200).json({ message: 'Favori supprimé avec succès' });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

module.exports = router;
