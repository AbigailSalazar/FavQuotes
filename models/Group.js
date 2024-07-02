const mongoose = require('mongoose');

const groupSchema = mongoose.Schema.create({
    name: {
        type: String,
        require: true
    },
    photo: {
        type: String,
        required: false
    },
    quotes:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quote'
    }
})

module.exports = mongoose.model("group", groupSchema);