const mongoose = require("mongoose")
const { Schema, model } = require ("mongoose")

const carritoSchema = mongoose.Schema({
    id: {type: Number, required: true},
    timestamp: {type: String, required: true, max: 30},
    productos: {type: Array}
})

const Carrito = mongoose.model("carritos", carritoSchema)

module.exports = Carrito