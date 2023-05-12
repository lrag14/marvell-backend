const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

// **************jouter un favori à un utilisateur
router.post("/user/favorites/add", async (req, res) => {
  try {
    const { userId, favoriteId } = req.body;
    // ********Cherche ID Utilisateur
    const user = await User.findById(userId);
    // *********PUSH Nouveau favori de l'ID
    user.favorites.push(favoriteId);
    // *******Sauvegarde
    await user.save();

    // Envoi la réponse*****************
    res.status(200).json({ message: "Favori ajouté avec succès" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour supprimer un favori d'un utilisateur
router.post("/user/favorites/remove", async (req, res) => {
  try {
    const { userId, favoriteId } = req.body;

    // Trouver l'utilisateur correspondant à l'ID
    const user = await User.findById(userId);

    // Filtrer la liste des favoris pour retirer l'élément avec l'ID correspondant
    user.favorites = user.favorites.filter((id) => id !== favoriteId);

    // Sauvegarder les modifications dans la base de données
    await user.save();

    // Envoyer une réponse avec un message de succès
    res.status(200).json({ message: "Favori supprimé avec succès" });
  } catch (error) {
    // En cas d'erreur, envoyer une réponse avec un message d'erreur
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
