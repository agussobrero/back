const ProductoMongoContainer = require("../../containers/mongo/productos/productoMongoContainer")
const config = require("../../config/config")
const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const productoSchema = new mongoose.Schema({
    timestamp: {type: String, required: true, max: 30},
    nombre: {type: String, required: true, max: 50},
    descripcion: {type: String, required: true, max: 100},
    codigo: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true}
})

class productoMongoDao extends ProductoMongoContainer {
    constructor() {
        super ("productos", productoSchema)
    }
}

module.exports = productoMongoDao