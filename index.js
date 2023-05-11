require("dotenv").config();
const express = require("express");

const cors = require("cors");

const axios = require("axios");

const app = express();
app.use(cors());

app.get("/characters", async (req, res) => {
  try {
    const name = req.query.name || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";

    // **************$INTEROGE LES SERVEUR
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );
    // *******REPONSE du data au front
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Bad Way" });
});

app.listen(process.env.PORT, () => {
  console.log("Server OP");
});
