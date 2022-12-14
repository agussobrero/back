const dotenv = require("dotenv")
dotenv.config()

const DATABASE_CLUSTER= process.env.DATABASE_CLUSTER
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_NAME = process.env.DATABASE_NAME
const DATABASE_CLI = process.env.DATABASE_CLI

const firebase = require("firebase-admin")
const serviceAccount = require("../../ecommercesobrero-firebase-adminsdk-uducb-b9754f8999.json")

try{
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: "https://ecommercesobrero.firebaseio.com"
    })
    console.log("Conectado a firebase")
} catch (err) {
    console.log(err)
}

const config = {
    mongoDb: {
        url: `mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/ecommerce?retryWrites=true&w=majority`,
        /* url: `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}${DATABASE_CLUSTER}/${DATABASE_NAME}?retryWrites=true&w=majority`, */
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    fileSystem: {
        dirProductos: "./src/controllers/files/productos.json",
        dirCarritos: "./src/controllers/files/carritos.json"
    },
    firebase: {
        db: firebase.firestore()
    }
}

module.exports = config