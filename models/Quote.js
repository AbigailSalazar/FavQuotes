const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    person: {
        type: String,
        require:true
    },
    quote: {
        type: String,
        required: true
    },
    votes:{
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model("Quote", quoteSchema);