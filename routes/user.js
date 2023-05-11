const express = require("express");
const router = express.Router();
// const uid2 = require("uid2");
// const SHA256 = reqiure("crypto-js/enc-base64");
// const enBase64 = require("crypto-js/enc-base64.js");

const User = require("../models/User.js");
const {sanitizeFilter} = require("mongoose");

router.post("/user/signup", async (req, res) => {
	try {
		const {usernames, email, password, newsletter} = req.body;
		const newUser = new User({
			email: email,
			account: {
				username: username,
			},
			token,
			salt,
			hash,
		});
	} catch (error) {
		res.status(400).json({error: error.message});
	}
});
module.exports = router;
