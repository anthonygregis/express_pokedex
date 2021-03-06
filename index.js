require('dotenv').config()
const express = require('express')
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT || 8000

app.use(require('morgan')('dev'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(methodOverride('_method'))

// GET - main index of site
app.get('/', function(req, res) {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151'
  // Use request to call the API
  axios.get(pokemonUrl).then(response => {
    let pokemon = response.data.results
    res.render('index', { pokemon: pokemon })
  });
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = server;
