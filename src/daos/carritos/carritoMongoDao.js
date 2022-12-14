const CarritoMongoContainer = require("../../containers/mongo/carritos/carritoMongoContainer")
const config = require("../../config/config")
const mongoose = require("mongoose")
const { Schema } = mongoose

const carritoSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    timestamp: {type: String, required: true, max: 30},
    productos: {type: Array}
})

class carritoMongoDao extends CarritoMongoContainer {
    constructor() {
        super ("carritos", carritoSchema)
    }
}

module.exports = carritoMongoDao