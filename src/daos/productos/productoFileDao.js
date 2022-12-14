const ProductoFileContainer = require("../../containers/files/productoFileContainer")
const config = require("../../config/config")

class productoFileDao extends ProductoFileContainer {
    constructor() {
        super (config.fileSystem.dirProductos)
    }
}

module.exports = productoFileDao
