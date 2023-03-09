/* import { MensajeDTO } from "../dto/mensaje.dto"
import { MensajeRepository } from "../repository/mensaje.reporitory"

const Contenedor = require("../containers/contenedorArchivo")
const contenedor = new Contenedor("src/database/mensaje.json")

class MensajeService {
    static repo: MensajeRepository

    static initRepo () {
        MensajeService.repo = new MensajeRepository()
    }

    static async save(mensaje: MensajeDTO) {
        MensajeService.initRepo()
        return MensajeService.repo.save(mensaje)
    }

    static async readAll() {
        MensajeService.initRepo()
        return MensajeService.repo.getAll()
    }

    static async getById(id) {
        MensajeService.initRepo()
        return MensajeService.repo.getById(id)
    }

    static async updateById(id, mensaje: MensajeDTO) {
        MensajeService.initRepo()
        return MensajeService.repo.update(id, mensaje)
    }

    static async deleteById(id) {
        MensajeService.initRepo()
        return MensajeService.repo.delete(id)
    }
}

module.exports = MensajeService */