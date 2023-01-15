const mongoose = require("mongoose")
const MONGO_URI2 = require("../config/config")
mongoose.set('strictQuery', true)

export class MongoConnection {
    private static connected = false
    private constructor () {}

    public static async connect() {
        if(!MongoConnection.connected) {
            try {
                await mongoose.connect("mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/clase40ts?retryWrites=true&w=majority")
                MongoConnection.connected = true
                mongoose.set('strictQuery', true)
                console.log("coneccion exitosa a MongoDB")
                return true
            } catch (err) {
                return false
            }
        }
        return false
    }
}
