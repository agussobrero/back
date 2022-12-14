const MongoContainer = require("../../containers/mongo/mongoContainer")
const { Carrito, carritoSchema } = require("../../databases/mongo/schemas/carrito")

class carritoMongoDaoSchema extends MongoContainer {
    constructor() {
        super ("carritos", carritoSchema)
    }
}

module.exports = carritoMongoDaoSchema