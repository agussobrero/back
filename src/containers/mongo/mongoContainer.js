const { Types, Schema } = require ("mongoose")
const connection = require("../../databases/mongo/index")

connection()

class MongoContainer {
    constructor (Schema) {
        this.Schema = Schema
    }

    save = async (objeto) => {
        try{
            /* producto.timestamp = Date.now() */
            const objetoNuevo = new this.Schema(objeto)
            const result = await objetoNuevo.save()
            return result
        } catch (err) {
            console.log(err)
        }
    }

    getAll = async () => {
        try{
            const result = await this.Schema.find()
            return result
        } catch (err) {
            console.log(err)
        }
    }

    getById = async (id) => {
        try{
            id = Types.ObjectId(id)
            const result = await this.Schema.findOne({_id: id})
            return result
        } catch (err) {
            console.log(err)
        }
    }

    updateById = async (id, objetoNuevo) => {
        try {
            id = Types.ObjectId(id)
            try {
                await this.Schema.findByIdAndUpdate({_id: id}, objetoNuevo)
            } catch {
                const carrito = await this.Schema.findOne({_id: id})
                carrito.productos.push(objetoNuevo)
                carrito.save()
            }
        } catch (err) {
            console.log(err)
        } 
    }

    deleteById = async (id) => {
        try{
            id = Types.ObjectId(id)
            const result = await this.Schema.deleteOne({_id: id})
            return result
        } catch (err) {
            console.log(err)
        }
    }

    deleteProduct = async (id, id_prod) => {
        try{
            const carrito = await this.Schema.findOne({_id: id})
            const carritoProd = carrito.productos
            const prodDeleteIndex = carritoProd.findIndex((obj)=> obj._id == id_prod)
            carritoProd.splice(prodDeleteIndex, 1)
            await this.Schema.updateOne(
                {_id: id}, 
                {$set: {productos: carritoProd}})
        } catch (err) {
            console.log(err)
        } 
    } 

    deleteAll = async () => {
        try{
            await this.Schema.deleteMany({})
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = MongoContainer