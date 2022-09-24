const fs = require("fs");

class ProductoFileController {
    constructor (fileName) {
        this.fileName = fileName
    }

    save = async (producto)=> {
        let id =""
        try{
            const productos = await this.getAll()
            producto.id = productos.reduce((max, obj) => { return obj.id > max ? obj.id : max }, 0) + 1
            const objectNew = {...producto, timestamp: Date.now(), id: producto.id}
            producto.timestamp = Date.now();
            productos.push(objectNew)
            await fs.promises.writeFile(this.fileName, JSON.stringify(productos, null, 2))
        }
        catch(err) {
            console.log(err)
        }
    }

    getById = async (id)=> {
        try{
            const productos = await this.getAll()
            const producto = await productos.find(producto => producto.id == id)
            return producto
        }
        catch(err) {
            console.log(err)
        }
    }

    getAll = async ()=> {
        try{
            const productos = await fs.promises.readFile(this.fileName, "utf-8");
            const cont = await JSON.parse(productos)
            if(productos) {
                return cont
            }
            else {
                return []
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    deleteById = async (id)=> {
        try{
            const objects = await this.getAll().then(objects=> {
                return objects.filter(obj=> obj.id !== id)
            }
            )
            await fs.promises.writeFile(this.fileName, JSON.stringify(objects, null, 2))
        }
        catch(err) {
            console.log(err)
        }
    }

    deleteAll = async()=> {
        try{
            await fs.promises.writeFile(this.fileName, "[]")
        }
        catch(err) {
            console.log(err)
        }
    }

    updateById = async (id, productoNuevo) =>{
        const productos = await this.getAll()
        const producto = await productos.find(producto => producto.id == id)
        const index = productos.indexOf(producto)
        productos[index] = {...productoNuevo, id: id}
        await fs.promises.writeFile(this.fileName, JSON.stringify(productos, null, 2))
    }
} 


module.exports = ProductoFileController

