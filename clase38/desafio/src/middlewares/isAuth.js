const jwt = require("jsonwebtoken")
const JWT_KEY = require("../config/config")

function isAuth (req, res, next) {
    const headers = req.headers
    if(!headers.authorization) {
        res.status(401).json({
            mensaje: "token requerido"
        })
        return
    }
    const token = headers.authorization.split("token ")[1]
    try {
        const verified = jwt.verify(token, JWT_KEY)
    } catch (err) {
        console.log(err)
    }
    next()
}

module.exports = isAuth