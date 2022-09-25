const { Router } = require ("express")
const router = Router()
const {productosDao} = require("../daos/index")
const authie = require ("../utils/authie")

const productos = productosDao

router.get("/", async (req, res) => {
    listaProductos = await productos.getAll()
    res.json(listaProductos)
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    const productoId = await productos.getById(id)
    res.json(productoId)
})

router.post("/", authie, (req, res) => {
    const body = req.body
    productos.save(body)
    res.json({succes: true})
})

router.put("/:id", authie, (req, res) => {
    body = req.body
    id = req.params.id
    productos.updateById(id, body)
})

router.delete("/:id", authie, (req, res) => {
    id = req.params.id
    productos.deleteById(id)
})

module.exports = router

