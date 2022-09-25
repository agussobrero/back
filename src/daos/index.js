const dotenv = require("dotenv")
dotenv.config()

const databaseMethod = process.env.DATABASE_METHOD

const productoFileDao = require("./productos/productoFileDao")
const productoMemoryDao = require("./productos/productoMemoryDao")
const productoMongoDao = require("./productos/productoMongoDao")
const productoFirebaseDao = require("./productos/productoFirebaseDao")

const carritoFileDao = require("./carritos/carritoFileDao")
const carritoMemoryDao = require("./carritos/carritoMemoryDao")
const carritoMongoDao = require("./carritos/carritoMongoDao")
const carritoFirebaseDao = require("./carritos/carritoFirebaseDao")

let productosDao = ""
let carritosDao = ""

switch (databaseMethod) {
    case "file" :
        productosDao = new productoFileDao()
        carritosDao = new carritoFileDao()
        break
    case "memory" :
        productosDao = new productoMemoryDao()
        carritosDao = new carritoMemoryDao()
        break
    case "mongoDB" :
        productosDao = new productoMongoDao()
        carritosDao = new carritoMongoDao()
        break
    case "firebase" :
        productosDao = new productoFirebaseDao()
        carritosDao = new carritoFirebaseDao()
        break
}

module.exports = {
    productosDao,
    carritosDao
}
