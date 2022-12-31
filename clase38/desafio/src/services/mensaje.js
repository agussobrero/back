const Contenedor = require("../containers/contenedorArchivo")
const contenedor = new Contenedor(__dirname + "/../database/mensaje.json")

class MensajeService {
    static save(mensaje) {
        return contenedor.save(mensaje)
    }

    static readAll() {
        return contenedor.getAll()
    }

    static getById(id) {
        return contenedor.getById(id)
    }

    static updateById(id, mensaje) {
        return contenedor.updateById(id, mensaje)
    }

    static deleteById(id) {
        return contenedor.deleteById(id)
    }
}

module.exports = MensajeService