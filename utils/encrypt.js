const CryptoJS = require("crypto-js");
require('dotenv').config();

class Encrypter{
    constructor() {}
    
    encrypt(mensaje){
        return CryptoJS.AES.encrypt(mensaje, process.env.SECRET_KEY).toString();
    }

    decrypt(mensaje){
        return CryptoJS.AES.decrypt(mensaje, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
    }
}
module.exports=new Encrypter()