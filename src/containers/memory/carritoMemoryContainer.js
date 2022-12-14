const fs = require ("fs")

class CarritoMemoryContainer {
    constructor () {
        this.container = [] 
    }

    createCarrito = (carrito) => {
                let idNuevo="";
                idNuevo = this.container.reduce((max, obj) => { return obj.id > max ? obj.id : max }, 0) + 1
                const carritoNew = {id: idNuevo, timestamp: Date.now(), productos: []}
                this.container.push(carritoNew)
                return carrito.id,
                console.log(`Carrrito con el id:${carrito.id} `)
    }

    getById = (id)=> {
        try{
            let carrito =""
            carrito = this.container.find(carrito => carrito.id == id)
            return carrito
        }
        catch(err) {
            console.log(err)
        }
    }

    deleteById = (id)=> {
        try{
            const carrito = this.container.find(carrito => carrito.id == id)
            const index = this.container.indexOf(carrito)
            this.container.splice(index,1)
            }
        catch(err) {
            console.log(err)
        }
    }

    addProduct = (id, producto) => {
        try {
            let carrito =""
            carrito = this.container.filter(obj => obj.id == id)
            producto.timestamp = Date.now()
            if (carrito[0].productos.length === 0) {
                producto.id = 1
            }
            else {
                producto.id = carrito[0].productos.reduce((max, obj) => { return obj.id > max ? obj.id : max }, 0) + 1
            }
            carrito[0].productos.push(producto)
            return carrito
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteProdudct = async (id, productoId) => {
        try {
            let carrito =""
            let producto =""
            carrito = this.container.find(carrito => carrito.id === +id)
            producto = carrito.productos.find(producto => producto.id === +productoId)
            const index = carrito.productos.indexOf(producto)
            this.container.productos.splice(index, 1)
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = CarritoMemoryContainer


