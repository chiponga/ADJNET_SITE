var CryptoJS = require("crypto-js");
var base64 = require('base-64');


function Descriptografar(MENSAGEM) {

    return JSON.parse(CryptoJS.AES.decrypt(base64.decode(MENSAGEM), "a53650a05d0c2d20b93433e828e2ab79f89d3f2669b82dbcba9a560b186dad8fa7701eda833a7b7994eda0538260d4c870f0c273248bbcd69fb34ac10a1bc11e").toString(CryptoJS.enc.Utf8))
}
function Criptografar(MENSAGEM) {

    return base64.encode(CryptoJS.AES.encrypt(JSON.stringify(MENSAGEM), "a53650a05d0c2d20b93433e828e2ab79f89d3f2669b82dbcba9a560b186dad8fa7701eda833a7b7994eda0538260d4c870f0c273248bbcd69fb34ac10a1bc11e"))
}




module.exports = { Criptografar, Descriptografar }