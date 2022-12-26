const mongoose = require("mongoose")
const config = require ("../../config/config.js")
const logger = require("../../../loggers/loggerConfig")

const { mongoDb } = config

connection = async () => {
    try {
        await mongoose.connect(mongoDb.url)
        logger.log("info", "Peticion Exitosa a MongoDB")
    } catch (err) {
        logger.log("error", `No se puede contectar, error: ${err}`)
    }
}

module.exports = connection