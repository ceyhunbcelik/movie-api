const express = require('express');
const router = express.Router();

// Models
const cMovie = require('../models/cMovie');

router.get('/', (req, res) => {
  cMovie.find({}, (err, data) => {
    console.log(data);
  });
});

router.post('/', (req, res, next) => {
  /*
  const { title, imdb_score, category, country, year } = req.body;

  const movie = new cMovie({
    title: title,
    imdb_score: imdb_score,
    category: category,
    country: country,
    year: year
  });
  */
 
  const movie = new cMovie(req.body);

  const promise = movie.save();

  promise.then((data) =>  {
    res.json(data)
  }).catch((err) => {
    res.json(err )
  })

  /*
  movie.save((err, data) => {
    if(err)
      res.json(err);

    res.json(data)
  })
  */
});

module.exports = router;
