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
            const _id = Types.ObjectId(id)
            let carrito =""
            const carritos = await this.getAll()
            carrito = carritos.filter(obj => obj._id === _id)
            producto.timeStamp = Date.now()
            carritos[0].productos.push(producto)
            
            await this.collection.updateOne(
                {_id: _id}, 
                {$set: {productos: carritos[0].productos}})
        } catch (err) {
            console.log(err)
        }
    }

    deleteProduct = async (id, id_prod) => {
        try{
            const _id = Types.ObjectId(id)
            const _prodId = Types.ObjectId(id_prod)
            const carritosJ = await this.getAll()
            const carritos = JSON.stringify(carritosJ,null, 2)
            console.log(carritos)

            const carritoIndex = carritos.findIndex((obj)=> obj._id == _id)
            const productosCarrito = carritos[carritoIndex].productos
            const prodDeleteIndex = productosCarrito.findIndex((obj)=> obj._id == _prodId)
            productosCarrito.splice(prodDeleteIndex, 1)

            await this.collection.updateOne(
                {_id: id}, 
                {$set: {productos: productosCarrito}})

        } catch (err) {
            console.log(err)
        } 
    } 
}

module.exports = CarritoMongoController

            /* const carritos = await this.getAll()
            carrito = carritos.find((obj=> obj._id == _id))
            console.log(carrito)
            producto = await carrito.productos.find(producto.id == _prodId)
            const index = carrito.productos.indexOf(producto)
            const _result = carrito.productos.splice(index, 1)
            await this.collection.updateOne(
                {_id: _id}, 
                {$set: {productos: _result}}) */