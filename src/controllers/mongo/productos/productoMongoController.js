const mongoose = require ("mongoose")
const {model, Types} = require ("mongoose")
const connection = require("../index")

connection()

class ProductoMongoController {
    constructor(collection, schema) {
        this.collection = model(collection, schema)
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
            id = Types.ObjectId(id)
            const result = await this.collection.findOne({_id: id})
            return result
        } catch (err) {
            console.log(err)
        }
    }

    getAll = async () => {
        try{
            const result = await this.collection.find()
            console.log(result)
            return result
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