const ProductoFileController = require("../../controllers/files/productoFileController")
const config = require("../../config/config")

class productoFileDao extends ProductoFileController {
    constructor() {
        super (config.fileSystem.dirProductos)
    }
}

module.exports = productoFileDao
