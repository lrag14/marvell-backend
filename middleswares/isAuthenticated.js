const User = require("../models/User.js");

const isAuthenticated = async (req, res, next) => {
  try {
    // *****Récupérer le token d'authentification *****
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      // *********Si token  absent********$ (Non autorisé)
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Recherche********************user Absent
    const user = await User.findOne({ token: token }).select("account _id"); //choix (" ")
    if (!user) {
      // *********user  absent********$ (Non autorisé)
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    // ************
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = isAuthenticated;
