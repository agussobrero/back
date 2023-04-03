const axios = require("axios")
/* const { logger } = require("../../src/utils/loggers/loggerConfig.") */
const URL = "http://localhost:3000"

const addProduct = async () => {
    try {
        const product = {
            name: "cbdCandyStrong",
            price: 18750,
            id: 2
        }
        const response = await axios.post(`${URL}/productos/`, product)
        /* logger.info(response.data) */
    } catch (error) {
        console.log(error)
    }
}

module.exports = addProduct