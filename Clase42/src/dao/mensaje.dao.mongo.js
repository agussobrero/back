/* import { MensajeDAOInterface } from "./mensaje.dao.interface";
import { Types, model, Schema } from "mongoose"
import { MensajeDTO } from "../dto/mensaje.dto";
const mensajeModel = require("../database/schemas/mensaje")
const MongoConnection = require("../database/index")

export class MensajeDAOMongoImpl implements MensajeDAOInterface {
    private mensajeModel
    constructor () {
        MongoConnection()
        this.mensajeModel = mensajeModel
    }

    async getAll() {
        return await this.mensajeModel.find()
    }

    async getById(id: string) {
        const _id = new Types.ObjectId(id)
        return await this.mensajeModel.findOne({_id})
    }

    async save(mensaje: MensajeDTO) {
        const _producto = new this.mensajeModel(mensaje)
        _producto.save()
        return _producto
    }

    async update(id: string, mensaje: MensajeDTO) {
        const _id = new Types.ObjectId(id)
        await this.mensajeModel.updateOne({_id}, mensaje)
        return mensaje
    }

    async delete(id: string) {
        const _id = new Types.ObjectId(id)
        await this.mensajeModel.deleteOne({_id})
        return true
    }
} */