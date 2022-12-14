const mongoose = require ("mongoose")
const {model, Types} = require ("mongoose")
const connection = require("../../../databases/mongo/index")

connection()

class ProductoMongoContainer {
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
            return result
        } catch (err) {
            console.log(err)
        }
    }

    updateById = async (id, productoNuevo) => {
        try {
            id = Types.ObjectId(id)
            const result = await this.collection.findByIdAndUpdate({_id: id}, productoNuevo)
            return result
        } catch (err) {
            console.log(err)
        } 
    }

    deleteById = async (id) => {
        try{
            id = Types.ObjectId(id)
            const result = await this.collection.deleteOne({_id: id})
            return result
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

module.exports = ProductoMongoContainer