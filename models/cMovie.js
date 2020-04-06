const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    direction_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'cMovie' });

module.exports = mongoose.model('cMovie', MovieSchema);