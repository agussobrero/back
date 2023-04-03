const axios = require("axios")
/* const { logger } = require("../../src/utils/loggers/loggerConfig.") */
const URL = "http://localhost:3000"
const productIdTest = "63c5e1e5f041f51bea7ce429"  

const editProduct = async () => {
    try {
        const update = {
            name: "cbdBombStrong",
            price: 20200
        }
        const response = await axios.put(`${URL}/productos/${productIdTest}`, update)
    } catch (error) {
        console.log(error)
    }
}

module.exports = editProduct