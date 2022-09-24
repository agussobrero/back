const mongoose = require ("mongoose")
const config = require ("../../config/config.js")

const { mongoDb } = config

connection = async () => {
    try {
        await mongoose.connect(mongoDb.url)
        console.log("Conectado a Producto MongoDb")
    } catch (err) {
        console.log(err)
    }
}

connection()
console.log(mongoDb.url)

const productoSchema = new mongoose.Schema({
    timestamp: {type: String, required: true, max: 30},
    nombre: {type: String, required: true, max: 50},
    descripcion: {type: String, required: true, max: 100},
    código: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true}
})

class ProductoMongoController {
    constructor(collection, schema) {
        this.collection = mongoose.model("productos", productoSchema)
    }

    save = async (producto) => {
        try{
            producto.timestamp = Date.now()
            const productoNuevo = new this.collection(producto)
            const result = await productoNuevo.save()
            return result
        } catch (err) {
            console.log(err)
        }
    }

    getById = async (id) => {
        try{
            await this.collection.findById({id})
        } catch (err) {
            console.log(err)
        }
    }

    getAll = async () => {
        try{
            await this.collection.find()
        } catch (err) {
            console.log(err)
        }
    }

    updateById = async (id, productoNuevo) => {
        try {
            await this.collection.findByIdAndUpdate({id}, productoNuevo)
        } catch (err) {
            console.log(err)
        } 
    }

    deleteById = async (id) => {
        try{
            await this.collection.deleteOne({id})
        } catch (err) {
            console.log(err)
        }
    }

    deleteAll = async () => {
        try{
            await this.collection.deleteMany({})
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = ProductoMongoController