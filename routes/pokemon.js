var express = require('express')
var router = express.Router()
var db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll().then(favoriteList => {
    res.render('pokemon/favorites', {favoriteList: favoriteList})
  })
});

// GET /pokemon/:id - return a page with detailed pokemon info
router.get('/:id', (req, res) => {
  let pokeName = req.params.id.toLowerCase()

  axios.get(`http://pokeapi.co/api/v2/pokemon/${pokeName}`).then(apiRes => {
    let pokemon = apiRes.data
    res.render('pokemon/detail', {pokemonData: pokemon})
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  db.pokemon.findOrCreate({
    where: {name: req.body.name}
  }).then(pokemon => {
    res.redirect('/pokemon')
  })
});

router.delete('/', (req, res) => {
  db.pokemon.destroy({
    where: {
      id: req.body.id
    }
  }).then(response => {
    console.log(response)
    res.redirect('/pokemon')
  }).catch(error => {
    console.log("Error", error)
  })

})

module.exports = router
