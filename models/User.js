const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:false
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require: false
    }
});

module.exports = mongoose.model('User',userSchema);