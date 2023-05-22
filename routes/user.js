const express = require('express');
const router = express.Router();
const uid2 = require('uid2');
const SHA256 = require('crypto-js/enc-base64');
const encBase64 = require('crypto-js/enc-base64.js');
const User = require('../models/User');
const isAthenticated = require('../middleswares/isAuthenticated.js');

// **************SIGNUP***************
router.post('/signup', isAthenticated, async (req, res) => {
   try {
      const { username, email, password } = req.body;
      const userExists = await User.findOne({ email: email });
      if (userExists) {
         return res.status(400).json({ error: 'User already exists' });
      }
      const token = uid2(64);
      const salt = uid2(64);
      const hash = SHA256(password + salt).toString(encBase64);
      const newUser = new User({
         email: email,
         password: password,
         token: token,
         salt: salt,
         hash: hash,
      });
      await newUser.save();
      res.json({
         email: email,
         account: newUser.account,
         token: token,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
   }
});

// ********************LOGIN*****************
router.post('/user/login', async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (userExists) {
         const newHash = SHA256(password + user.salt).toString(encBase64);
         res.json({ email: email, account: account, token: token });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
   }
});
module.exports = router;
