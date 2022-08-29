const { Router } = require("express")
const router = Router()
const Contenedor = require ("../utils/container")
const productos = new Contenedor("./productos.json")

router.get("/", (req, res) => {
    res.send(productos.getAll())
    res.json("funciona?")
})

router.post("/", (req, res) => {
    const body = req.body
    console.log(body)
    const prod = {
        name: body.name,
        price: body.price
    }
    productos.save(prod)
    res.send(prod)
})

router.put("/:id", (req, res) => {
    const body = req.body
    const id = req.params.id
    const newProdId = {
        name: body.name,
        price: body.price
    }
    productos.updateById(id, newProdId)
    res.send(newProdId)
})

module.exports = router