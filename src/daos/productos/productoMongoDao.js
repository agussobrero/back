const ProductoMongoController = require("../../controllers/mongo/productoMongoController")
const config = require("../../config/config")
const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const productoSchema = new mongoose.Schema({
    timestamp: {type: String, required: true, max: 30},
    nombre: {type: String, required: true, max: 50},
    descripcion: {type: String, required: true, max: 100},
    código: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true}
})

class productoMongoDao extends ProductoMongoController {
    constructor() {
        super ("productos", productoSchema)
    }
}

module.exports = productoMongoDao