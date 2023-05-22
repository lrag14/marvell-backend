require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
app.use(cors());
///////////////////////////////////////////////////////////////////////////
// *******GET***ALL PERSONNAGES**********************************************
app.get('/characters', async (req, res) => {
   try {
      //     Query
      // apiKey	API key received
      // limit	between 1 and 10
      // skip	number of results to ignore
      // name	search a character by name
      const limit = req.query.limit || '100';
      const skip = req.query.skip || '0';
      const name = req.query.name || '';

      const response = await axios.get(
         `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&limit=${limit}&skip=${skip}`
      );
      res.json(response.data); // console.log OP 👍
   } catch (error) {
      res.status(404).json({ message: 'catchError' });
   }
});
/////////////////////////////////////////////////////////////////////////////////
// *******GET*** ALL COMICSBD************
app.get('/comics', async (req, res) => {
   try {
      //     Query
      // apiKey	API key
      // limit	between 1 and 100
      // skip	number of results to ignore
      // title	search a comic by title
      const limit = req.query.limit || '100';
      const skip = req.query.skip || '0';
      const title = req.query.title || '';

      const response = await axios.get(
         `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&limit=${limit}&skip=${skip}`
      );
      res.json(response.data); // console.log OP 👍
   } catch (error) {
      res.status(404).json({ message: 'catchError Comics' });
   }
});

/////////////////////////////////////////////////////////////////////////////////
// *******GET*****COMICS By Specicifiq CHARACTER************
app.get('/comics/:characterId', async (req, res) => {
   try {
      //*******Params
      // characterId
      //****  Query
      // apiKey	API key

      const characterId = req.params.characterId; //

      const response = await axios.get(
         `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.API_KEY}`
      );
      // console.log(response.data); OP 👍
      res.json(response.data);
   } catch (error) {
      res.status(404).json({ message: 'catchError comics/charcId' });
   }
});
/////////////////////////////////////////////////////////////////////////////////
// *******************GET INFORMATION BY COMIC
app.get(`/comic/comicId`, async (req, res) => {
   try {
      // Params
      // comicId
      // Query	Info
      // // apiKey	API key
      const comicId = req.params.comicId;
      const response = await axios.get(
         `https://lereacteur-marvel-api.herokuapp.com/${comicId}/?apiKey=${process.env.API_KEY}`
      );

      res.json(response.data); // 👍
   } catch (error) {
      res.status(404).json({ message: 'Catch comic/comiId' });
   }
});
//////////////////////////////////////////////////////////////////////////////////
// *******************GET INFORMATION BY CHARACTER
// Params	Info
// characterId
// Query

// Query
// apiKey

app.get(`/character/:characterId`, async (req, res) => {
   try {
      const characterId = req.params.characterId;
      const response = await axios.get(
         `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.API_KEY}`
      );

      res.json(response.data);
   } catch (error) {
      res.status(404).json({ message: 'catch charac/charId' });
   }
});

/////////////////////////////////////////////////////////////////////////////////
// *******************
app.all('*', (req, res) => {
   res.status(404).json({ message: 'route absente' });
});

app.listen(process.env.PORT, () => {
   console.log('Server OP');
});
