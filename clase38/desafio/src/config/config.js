const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT || 3000
const JWT_KEY = process.env.JWT_KEY

module.exports = {
    PORT,
    JWT_KEY
}