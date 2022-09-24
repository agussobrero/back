const mongoose = require ("mongoose")
const config = require ("../../config/config.js")

const { mongoDb } = config

connection = async () => {
    try {
        await mongoose.connect(mongoDb.url)
        console.log("Conectado a Carrito MongoDb")
    } catch (err) {
        console.log(err)
    }
}

connection()

const carritoSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    timestamp: {type: Number},
    productos: {type: Array}
})

class CarritoMongoController {
    constructor(collection, schema) {
        this.collection = mongoose.model("carritos", carritoSchema)
    }

    getAll = async () => {
        try{
            await this.collection.find()
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
                idNuevo = carritos.reduce((max, obj) => { return obj.id > max ? obj.id : max }, 0) + 1
                const carrito = {id: idNuevo, timestamp: Date.now(), productos: []}
                const carritoNew = new this.collection(carrito)
                result = await carritoNew.save()
                return result
            }
        } catch (err) {
            console.log(err)
        }
    }

    getById = async (id) => {
        try{
            let carrito =""
            const carritos = await this.getAll()
            carrito = await this.collection.findById({id})
            return carrito
        } catch (err) {
            console.log(err)
        }
    }

    deleteById = async (id) => {
        try{
            await this.collection.deleteById({id})
        } catch (err) {
            console.log(err)
        }
    }

    addProduct = async (id, producto) => {
        try{
            let carrito =""
            const carritos = await this.getAll()
            carrito = await carritos.filter(obj => obj.id == +id)
            producto.timeStamp = Date.now()
            if (carrito[0].productos.length === 0) {
                producto.id = 1
            }
            else {
                producto.id = await carrito[0].productos.reduce((max, obj) => { return obj.id > max ? obj.id : max }, 0) + 1
            }
            carrito[0].productos.push(producto)
            await this.collection.updateOne(
                {id: id}, 
                {$set: {productos: carrito[0].productos}})
        } catch (err) {
            console.log(err)
        }
    }
    deleteProduct = async (id, productoId) => {
        try{
            let carrito =""
            let producto =""
            const carritos = await this.getAll()
            carrito = await carritos.find(carrito => carrito.id === +id)
            producto = await carrito.productos.find(producto => producto.id === +productoId)
            const index = carrito.productos.indexOf(producto)
            carrito.productos.splice(index, 1)
            await this.collection.deleteOne(id)
        } catch (err) {
            console.log(err)
        } 
    } 
}

module.exports = CarritoMongoController