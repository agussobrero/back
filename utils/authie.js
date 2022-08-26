function authie (req, res, next) {
    const token = req.body.token
    if(!token) {
        res.send("Acceso denegado")
        return 
    } else {
        req.token = token
        next()
    }
}

module.exports = authie