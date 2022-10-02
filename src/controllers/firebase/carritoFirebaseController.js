const config = require("../../config/config")

class CarritoFirebaseController {
    constructor() {
        this.db = config.firebase.db,
        this.query = this.db.collection("carritos")
    }

    getAll = async () => {
        try{
            const querySnapshot = await this.query.get()
            let docs = querySnapshot.docs
            return docs.map((doc)=> (doc.data()))
        } catch (err) {
            console.log(err)
        }
    }

    createCarrito = async () => {
        try {
            let docs = this.query.doc()
            const carrito = {id: docs.id, timeStamp: Date.now(), productos: []}
            const result = await docs.set(carrito)
            return result
        } catch (err) {
            console.log(err)
        }
    }

    getById = async (id) => {
        try{
            let doc = this.query.doc(`${id}`)
            let carrito = await doc.get()
            return carrito.data()
        } catch (err) {
            console.log(err)
        }
    }

    deleteById = async (id) => {
        try{
            let doc = this.query.doc(`${id}`)
            let carrito = await doc.delete()
        } catch (err) {
            console.log(err)
        }
    }

    addProduct = async (id, producto) => {
        try{
            let carrito= this.query.doc(`${id}`)
            const carritoInfo = await carrito.get()
            const productosCarrito = carritoInfo.data().productos
            productosCarrito.push(producto)
            await carrito.update({productos: productosCarrito})
        } catch (err) {
            console.log(err)
        }
    }

    deleteProduct = async (id, prodId) => {
        try{
            let producto =""
            let carrito= this.query.doc(`${id}`)
            const carritoInfo = await carrito.get()
            const productosCarrito = carritoInfo.data().productos
            const productoIndex = productosCarrito.find((obj)=> obj.id == prodId)
            const index = productosCarrito.indexOf(productoIndex)
            const carritoProd = productosCarrito.splice(index, 1)
            const _result = await carrito.update({
                productos: carritoProd
            })
        } catch (err) {
            console.log(err)
        } 
    } 
}

module.exports = CarritoFirebaseController