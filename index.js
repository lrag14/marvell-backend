const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const isAuthenticated = require("./middleswares/isAuthenticated.js");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use(fileUpload());

// GET CHARACTERS****************
app.get("/characters", async (req, res) => {
  try {
    const name = req.query.name || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPLOAD FILES **************************
app.post("/upload", isAuthenticated, async (req, res) => {
  try {
    // *****RECUPERER LE TOKEN******MIDDLEWAIRES********POST********
    res.json({ message: "File uploaded" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// OTHER PAGES
app.all("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

// START SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
