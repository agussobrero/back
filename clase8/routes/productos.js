const { Router } = require("express")

const routerProductos = new Router()

routerProductos.get("/", (req, res) => {
    res.json({mensaje: "correcto"})
})

routerProductos.post("/productos", (req, res) => {
    console.log(req.body)
    res.json({mensaje: "ok post"})
})

routerProductos.put("/productos/:id", (req, res) => {
    const id = req.params.id
    res.json({
        nensaje: "ok put",
        id: req.params.id,
        nuevo: req.body
    })
})

routerProductos.delete("/productos/:id", (req, res) => {
    const id = req.params.id
    res.json({
        nensaje: "ok delete",
        id: req.params.id,
        nuevo: req.body
    })
})

module.exports = routerProductos