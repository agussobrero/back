const CarriroFileController = require("../../controllers/files/carritoFileController")
const config = require("../../config/config")

class carritoFileDao extends CarriroFileController {
    constructor() {
        super (config.fileSystem.dirCarritos)
    }
}

module.exports = carritoFileDao