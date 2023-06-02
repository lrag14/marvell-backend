const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const isAuthenticated = require('../middlewares/isAuthenticated.js');

// Ajouter un favori à un utilisateur
router.post('/user/favorit', isAuthenticated, async (req, res) => {
   try {
      const { userId, favoriteId } = req.body;

      // Cherche ID Utilisateur
      const user = await User.findById(userId);
      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      user.favorit.push(favoriteId);
      // Sauvegarde
      await user.save();

      // Envoi de la réponse
      res.status(200).json({ message: 'Favori ajouté avec succès' });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

// Supprimer un favori d'un utilisateur
router.delete('/user/favorit', isAuthenticated, async (req, res) => {
   try {
      const { userId, favoriteId } = req.body;

      const user = await User.findById(userId);
      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      user.favorit = user.favorit.filter((id) => id !== favoriteId);
      await user.save();

      res.status(200).json({ message: 'Favori supprimé avec succès' });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

module.exports = router;
