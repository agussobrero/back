const mongoose = require("mongoose");

async function connection() {
    const URIString="mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/clase46?retryWrites=true&w=majority"
    await mongoose.connect(URIString);
    console.log('conectado con Koa')
}

module.exports = connection

