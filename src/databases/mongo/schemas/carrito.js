const mongoose = require("mongoose")
const Schema = mongoose.Schema

const carritoSchema = new Schema({
    id: {type: Number, required: true},
/*     timestamp: {type: String, required: true, max: 30}, */
    productos: {type: Array}
}, {timestamps: true})

const Carrito = mongoose.model("carritos", carritoSchema)

module.exports = Carrito