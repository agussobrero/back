const axios = require("axios")
/* const { logger } = require("../../src/utils/loggers/loggerConfig.") */
const URL = "http://localhost:3000"
const productIdTest = "63c5e1e5f041f51bea7ce429"  

const deleteProduct = async () => {
    try {
        const response = await axios.delete(`${URL}/productos/${productIdTest}`)
        /* logger.info(response.data) */
    } catch (error) {
        console.log(error)
    }
}

module.exports = deleteProduct