const mongoose = require('mongoose');
require('dotenv').config({path:'./variables.env'});

const config={
    url:process.env.URL_MONGO,
    options:{}
}

async function connect(){
    return await mongoose.connect(config.url,config.options);
}

async function disconnect(){
    return mongoose.disconnect();
}

module.exports= {connect,disconnect};