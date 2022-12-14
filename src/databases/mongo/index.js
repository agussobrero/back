const mongoose = require("mongoose")
const config = require ("../../config/config.js")

const { mongoDb } = config

connection = async () => {
    try {
        await mongoose.connect(mongoDb.url)
        console.log("Conectado a MongoDb")
    } catch (err) {
        console.log(err)
    }
}

module.exports = connection