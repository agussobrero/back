let admin = true

function authie (req, res, next) {
    if(!admin) {
        res.send("Acceso denegado")
        return 
    } else {
        next()
    }
}

module.exports = authie