const {Schema, model} = require("mongoose")

const productoSchema = new Schema({
    name: {type: String, require: true},
    price: {type: Number, require: true}
}, {timestamps: true})

const productoModel = new model("productos", productoSchema)

module.exports = productoModel