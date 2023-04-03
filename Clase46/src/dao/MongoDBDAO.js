const { Types } = require("mongoose")
const logger = require("../utils/loggers/loggerConfig.")

class MongoDBDAO {
    constructor (Model) {
        this.Model = Model
    }
    
    save = async (objeto) => {
        try{
            /* producto.timestamp = Date.now() */
            const objetoNuevo = new this.Model(objeto)
            const result = await objetoNuevo.save()
            return result
        } catch (err) {
            logger.log("error", `Ocurrió un error: ${err}`)
        }
    }

    getAll = async () => {
        try{
            const result = await this.Model.find()
            return result
        } catch (err) {
            logger.log("error", `Ocurrió un error: ${err}`)
        }
    }

    getById = async (id) => {
        try{
            id = Types.ObjectId(id)
            const result = await this.Model.findOne({_id: id})
            return result
        } catch (err) {
            logger.log("error", `Ocurrió un error: ${err}`)
        }
    }

    updateById = async (id, objetoNuevo) => {
        try {
            id = Types.ObjectId(id)
            try {
                await this.Model.findByIdAndUpdate({_id: id}, objetoNuevo)
            } catch {
                const carrito = await this.Model.findOne({_id: id})
                carrito.productos.push(objetoNuevo)
                carrito.save()
            }
        } catch (err) {
            logger.log("error", `Ocurrió un error: ${err}`)
        } 
    }

    deleteById = async (id) => {
        try{
            id = Types.ObjectId(id)
            const result = await this.Model.deleteOne({_id: id})
            return result
        } catch (err) {
            logger.log("error", `Ocurrió un error: ${err}`)
        }
    }

    deleteAll = async () => {
        try{
            await this.Model.deleteMany({})
        } catch (err) {
            logger.log("error", `Ocurrió un error: ${err}`)
        }
    }
}

module.exports = MongoDBDAO
