const Contenedor = require("../containers/contenedorArchivo")
const contenedor = new Contenedor(__dirname + "/../database/producto.json")


class ProductoService {
    static save(producto) {
        return contenedor.save(producto)
    }

    static readAll() {
        return contenedor.getAll()
    }

    static getById(id) {
        return contenedor.getById(id)
    }

    static updateById(id, producto) {
        return contenedor.updateById(id, producto)
    }

    static deleteById(id) {
        return contenedor.deleteById(id)
    }
}

module.exports = ProductoService