const fs = require ("fs")

class CarritoFileContainer {
    constructor (fileName) {
        this.fileName = fileName
    }

    createCarrito = async (carrito) => {
        try {
            if (!fs.existsSync(this.fileName)) {
                const carritos = []
                const carrito = {id: 1, timeStamp: Date.now(), productos: []}
                carritos.push(carrito)
                await fs.promises.writeFile(this.fileName, JSON.stringify(carritos, null, 2))
                return carrito.id,
                console.log(`carrito creado con el id: ${carrito.id}`)
                
            } else {
                let idNuevo="";
                const data = await fs.promises.readFile(this.fileName, "utf-8");
                const carritos = await JSON.parse(data);
                idNuevo = carritos.reduce((max, obj) => { return obj.id > max ? obj.id : max }, 0) + 1
                const carritoNew = {id: idNuevo, timestamp: Date.now(), productos: []}
                carritos.push(carritoNew)
                await fs.promises.writeFile(this.fileName, JSON.stringify(carritos, null, 2))
                return carrito.id,
                console.log(`Carrito con el id:${carrito.id} `)
                
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    getById = async (id)=> {
        try{
            let carrito =""
            const data = await fs.promises.readFile(this.fileName, "utf-8");
            const carritos = await JSON.parse(data);
            carrito = await carritos.find(carrito => carrito.id == id)
            return carrito
        }
        catch(err) {
            console.log(err)
        }
    }

    deleteById = async (id)=> {
        try{
            const data = await fs.promises.readFile(this.fileName, "utf-8");
            const carritos = await JSON.parse(data);
            const carrito = carritos.find(carrito => carrito.id == id)
            const index = carritos.indexOf(carrito)
            carritos.splice(index,1)
            await fs.promises.writeFile(this.fileName, JSON.stringify(carritos, null, 2))
            }
        catch(err) {
            console.log(err)
        }
    }

    addProduct = async (id, producto) => {
        try {
            let carrito =""
            const data = await fs.promises.readFile(this.fileName, "utf-8");
            const carritos = await JSON.parse(data);
            carrito = await carritos.filter(obj => obj.id == id)
            producto.timestamp = Date.now()
            if (carrito[0].productos.length === 0) {
                producto.id = 1
            }
            else {
                producto.id = await carrito[0].productos.reduce((max, obj) => { return obj.id > max ? obj.id : max }, 0) + 1
            }
            carrito[0].productos.push(producto)
            await fs.promises.writeFile(this.fileName, JSON.stringify(carritos, null, 2))
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
            const data = await fs.promises.readFile(this.fileName, "utf-8");
            const carritos = await JSON.parse(data);
            carrito = await carritos.find(carrito => carrito.id === +id)
            producto = await carrito.productos.find(producto => producto.id === +productoId)
            const index = carrito.productos.indexOf(producto)
            carrito.productos.splice(index, 1)
            await fs.promises.writeFile(this.fileName, JSON.stringify(carritos, null, 2))
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = CarritoFileContainer


