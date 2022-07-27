const { Router } = require("express")

const routerProductos = new Router()

routerProductos.get("/", (req, res) => {
    res.json({mensaje: "correcto manejo de router"})
})


module.exports = routerProductos