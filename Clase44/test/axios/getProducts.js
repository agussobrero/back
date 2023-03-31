const axios = require("axios")
/* const { logger } = require("../../src/utils/loggers/loggerConfig.") */
const URL = "http://localhost:3000"

const getProducts = async () => {
    try {
        const response = await axios.get(`${URL}/productos/`)
        /* logger.info(response.data) */
    } catch (error) {
        console.log(error)
    }
}

module.exports = getProducts