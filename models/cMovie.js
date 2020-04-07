const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur'],
        maxlength: [20, '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır!'],
        minlength: [3, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır!']
    },
    category: {
        type: String,
        maxlength: 30,
        minlength: 3
    },
    country: {
        type: String,
        maxlength: 30,
        minlength: 3
    },
    year: {
        type: Number,
        max: 2040,
        min: 1900
    },
    imdb_score: {
        type: Number,
        max: 10,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'cMovie' });

module.exports = mongoose.model('cMovie', MovieSchema);