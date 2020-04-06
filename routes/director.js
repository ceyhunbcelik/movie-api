const express = require('express');
const router = express.Router();

// Models
const cDirector = require('../models/cDirector');

router.post('/', (req, res) => {
    
    const director = new cDirector(req.body)
    
    const promise = director.save();
    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err);
    });

});

module.exports = router;