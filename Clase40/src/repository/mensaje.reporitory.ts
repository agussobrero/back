/* const MensajeFactory = require("../factory/mensaje.factory")
const MensajeDTO = require("../dto/mensaje.dto")

export class MensajeRepository {
    private mensajeDao
    constructor () {
        const mensajeFactory = MensajeFactory()
        this.mensajeDao = mensajeFactory.getDAO()
    }
    getAll(){
        const mensajes: typeof MensajeDTO = this.mensajeDao.getAll()
    }
    getById(id: string){
        const mensaje: typeof MensajeDTO = this.mensajeDao.getById(id)
    }
    save(mensaje: typeof MensajeDTO){
        const _result: typeof MensajeDTO = this.mensajeDao.save(mensaje)
    }
    update(id: string, mensaje: typeof MensajeDTO){
        const _result: typeof MensajeDTO = this.mensajeDao.update(id, mensaje)
    }
    delete(id: string){
        const _result: typeof MensajeDTO = this.mensajeDao.delete(id)
    }
} */
