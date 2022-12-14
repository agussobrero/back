const mongoose = require ("mongoose")
const { Schema, model } = require ("mongoose")

const productoSchema = new mongoose.Schema({
    nombre: {type: String, required: true, max: 50},
    descripcion: {type: String, required: true, max: 100},
    codigo: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true}
}, {timestamps: true})

const Producto = mongoose.model("productos", productoSchema)

module.exports = Producto