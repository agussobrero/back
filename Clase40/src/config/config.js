const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT || 3000
const JWT_KEY = process.env.JWT_KEY

const DATABASE_CLUSTER= process.env.DATABASE_CLUSTER
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_NAME = process.env.DATABASE_NAME
const DATABASE_TYPE = process.env.DATABASE_TYPE

MONGO_URI = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_CLUSTER}/${DATABASE_NAME}?retryWrites=true&w=majority`,
MONGO_URI2 = "mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/clase40ts?retryWrites=true&w=majority"

module.exports = {
    PORT,
    JWT_KEY,
    MONGO_URI,
    MONGO_URI2,
    DATABASE_TYPE
}