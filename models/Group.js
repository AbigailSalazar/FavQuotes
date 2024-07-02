const mongoose = require('mongoose');
const quote = require('./Quote');

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    photo: {
        type: String,
        required: false
    },
    quotes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quote'
    }]
})

module.exports = mongoose.model("group", groupSchema);