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
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
})

module.exports = mongoose.model("Quote", quoteSchema);