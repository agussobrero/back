const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const DATABASE_CLUSTER= process.env.DATABASE_CLUSTER
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_NAME = process.env.DATABASE_NAME
const DATABASE_CLI = process.env.DATABASE_CLI

connection = async () => {
    const URIString = "mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/test?retryWrites=true&w=majority"
    try{
        await mongoose.connect(URIString)
        console.log("Conectado a MongoDb")
    } catch(err) {
        console.log(err)
    }
}

connection() 

module.exports = connection
