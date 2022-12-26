const { DATABASE_CLUSTER, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_CLI } = require("./configConst")
const firebase = require("firebase-admin")
const serviceAccount = require("../databases/firebase/ecommercesobrero-firebase-adminsdk-uducb-b9754f8999.json")
const logger = require("../../loggers/loggerConfig")

try{
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: "https://ecommercesobrero.firebaseio.com"
    })
    logger.log("info", "Peticion Exitosa a firebase")
} catch (err) {
    logger.log("error", `No se puede contectar, error: ${err}`)
}

const config = {
    mongoDb: {
        /* url: `mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/ecommerce?retryWrites=true&w=majority`, */
        url: `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_CLUSTER}/${DATABASE_NAME}?retryWrites=true&w=majority`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    fileSystem: {
        dirProductos: "./src/containers/files/productos.json",
        dirCarritos: "./src/containers/files/carritos.json"
    },
    firebase: {
        db: firebase.firestore()
    }
}

module.exports = config