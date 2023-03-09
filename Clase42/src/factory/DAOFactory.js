const { PRODUCT_PERSISTENCE, MESSAGE_PERSISTENCE } = require("../config/config")
const MongoDBDAO = require("../dao/MongoDBDAO")
const productoModel = require("../database/schemas/producto")
const mensajeModel = require("../database/schemas/mensaje")

class DAOFactory {
    constructor () {}

    static getProductDAO () {
        switch (PRODUCT_PERSISTENCE) {
            case "mongo":
                if(this.ProductDAO) {
                    return this.ProductDAO
                }
            this.ProductDAO = new MongoDBDAO(productoModel)
            return this.ProductDAO
        }
    }

    static getMessageDAO () {
        switch (MESSAGE_PERSISTENCE) {
            case "mongo":
                if(this.MessageDAO) {
                    return this.MessageDAO
                }
            this.MessageDAO = new MongoDBDAO(mensajeModel)
            return this.MessageDAO
        }
    }
}

module.exports = DAOFactory