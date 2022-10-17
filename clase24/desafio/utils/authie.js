function authie (req, res, next) {
        const actualConexion = Date.now()
        const tiempoTranscu = actualConexion - req.session.ultimaConexion
        console.log(actualConexion)
        console.log(req.session.ultimaConexion)
        console.log(tiempoTranscu)
        if (tiempoTranscu > 20 * 1000) {
            res.redirect("/login")
        } else {
            next()
        }
}

module.exports = authie