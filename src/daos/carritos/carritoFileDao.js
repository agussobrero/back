const CarriroFileContainer = require("../../containers/files/carritoFileContainer")
const config = require("../../config/config")

class carritoFileDao extends CarriroFileContainer {
    constructor() {
        super (config.fileSystem.dirCarritos)
    }
}

module.exports = carritoFileDao