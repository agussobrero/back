const dotenv = require("dotenv")
dotenv.config()

const DATABASE_CLUSTER= process.env.DATABASE_CLUSTER
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_NAME = process.env.DATABASE_NAME
const DATABASE_CLI = process.env.DATABASE_CLI

const config = {
    mongoDb: {
        url: "mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/ecommerce?retryWrites=true&w=majority",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    fileSystem: {
        dirProductos: "../controllers/files/productos.json",
        dirCarritos: "../controllers/files/carritos.json"
    },
    firebase: {

    }
}

module.exports = config