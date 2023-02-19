const mongoose = require('mongoose');


const songSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        artist: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        album: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
});

module.exports = mongoose.model('Song', songSchema);