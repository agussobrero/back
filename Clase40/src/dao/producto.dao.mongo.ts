import { Types/* , model, Schema */ } from "mongoose"
const MongoConnection = require("../database/index")
const productoModel = require("../database/schemas/producto")
import { ProductoDAOInterface } from "./producto.dao.interface"
import { ProductoDTO } from "../dto/producto.dto"

export class ProductoDAOMongoImpl implements ProductoDAOInterface {
    private productoModel
    constructor () {
        MongoConnection()
        this.productoModel = productoModel
    }
    
    async getAll() {
        const _result = await this.productoModel.find({})
        console.log(_result)
    }

    async getById(id: string) {
        const _id = new Types.ObjectId(id)
        return await this.productoModel.findOne({_id})
    }

    async save(producto: ProductoDTO) {
        const _producto = new this.productoModel(producto)
        _producto.save()
        return _producto
    }

    async update(id: string, producto: ProductoDTO) {
        const _id = new Types.ObjectId(id)
        await this.productoModel.updateOne({_id}, producto)
        return producto
    }

    async delete(id: string) {
        const _id = new Types.ObjectId(id)
        await this.productoModel.deleteOne({_id})
        return true
    }
}