const mongoose = require("mongoose")
const MONGO_URI2 = require("../config/config")
mongoose.set('strictQuery', true)

class MongoConnection {
    static connected = false
    constructor () {}

    static async connect() {
        if(!MongoConnection.connected) {
            try {
                await mongoose.connect("mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/clase44?retryWrites=true&w=majority")
                MongoConnection.connected = true
                mongoose.set('strictQuery', true)
                console.log("conexion exitosa a MongoDB")
                return true
            } catch (err) {
                return false
            }
        }
        return false
    }
}

module.exports = MongoConnection
