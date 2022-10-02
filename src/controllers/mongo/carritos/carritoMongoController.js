const mongoose = require ("mongoose")
const {model, Types} = require ("mongoose")
const connection = require("../index")

connection()

class CarritoMongoController {
    constructor(collection, schema) {
        this.collection = model(collection, schema)
    }

    getAll = async () => {
        try{
            const result = await this.collection.find()
            return result
        } catch (err) {
            console.log(err)
        }
    }

    createCarrito = async () => {
        try {
            const carritos = await this.getAll()
            if(carritos.length === 0) {
                const carrito = {id: 1, timeStamp: Date.now(), productos: []}
                const carritoNew = new this.collection(carrito)
                const result = await carritoNew.save()
                return result
            } else {
                let idNuevo = carritos.reduce((max, obj) => { return obj.id > max ? obj.id : max }, 0) + 1
                const carrito = {id: idNuevo, timestamp: Date.now(), productos: []}
                const carritoNew = new this.collection(carrito)
                let result = await carritoNew.save()
                return result
            }
        } catch (err) {
            console.log(err)
        }
    }

    getById = async (id) => {
        try{
            const _id = Types.ObjectId(id)
            const carrito = await this.collection.findOne({_id: _id})
            const productos = carrito.productos
            return productos
        } catch (err) {
            console.log(err)
        }
    }

    deleteById = async (id) => {
        try{
            const _id = Types.ObjectId(id)
            const _result = await this.collection.deleteOne({_id: _id})
            return _result
        } catch (err) {
            console.log(err)
        }
    }

    addProduct = async (id, producto) => {
        try{
            const carrito = await this.collection.findOne({_id: id})
            carrito.productos.push(producto)
            carrito.save()
        } catch (err) {
            console.log(err)
        }
    }

    deleteProduct = async (id, id_prod) => {
        try{
            const carrito = await this.collection.findOne({_id: id})
            const carritoProd = carrito.productos
            const prodDeleteIndex = carritoProd.findIndex((obj)=> obj._id == id_prod)
            carritoProd.splice(prodDeleteIndex, 1)
            await this.collection.updateOne(
                {_id: id}, 
                {$set: {productos: carritoProd}})
        } catch (err) {
            console.log(err)
        } 
    } 
}

module.exports = CarritoMongoController
