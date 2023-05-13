require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(cors());

// *******GET*****PERSONNAGES************
app.get("/personnages", async (req, res) => {
  try {
    const name = req.query.name || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&limit=${limit}&skip=${skip}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: "catchError" });
  }
});

// *******GET*****COMICSBD************

app.get("/comics", async (req, res) => {
  try {
    const title = req.query.title || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&limit=${limit}&skip=${skip}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: "catchError Comics" });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "route absente" });
});

app.listen(process.env.PORT, () => {
  console.log("Server OP");
});
