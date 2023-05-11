require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios"); //1

const app = express();
app.use(cors());

app.get("/characters", async (req, res) => {
	try {
		const name = req.query.name || "";
		const skip = req.query.skip || "0";
		const limit = req.query.limit || "100";

		const response = await axios.get(
			//1
			`https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
		);
		console.log(response.data);
		// *********************ENVOI AU FRONT
		res.json(response.data); // reponse au front
		// *********************ENVOI AU FRONT
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

app.all("*", (req, res) => {
	res.status(404).json({message: "This route does not exist"});
});

app.listen(process.env.PORT, () => {
	console.log("Server OP");
});
