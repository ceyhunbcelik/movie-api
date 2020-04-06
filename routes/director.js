const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Models
const cDirector = require('../models/cDirector');

router.get('/:director_id', (req, res) => {
    const promise = cDirector.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.director_id) 
            }
        },
        {
            $lookup: {
                from: 'cMovie',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true 
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

router.get('/', (req, res) => {
    
    const promise = cDirector.aggregate([
        {
            $lookup: {
                from: 'cMovie',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true 
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

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