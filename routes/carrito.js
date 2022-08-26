const { Router } = require("express")
const router = Router()
const Contenedor = require("../utils/contenedorCarrito")
const carrito = new Contenedor("./carrito.json")
const authie = require("../utils/authie")

router.post("/", authie, (req, res) => {
    carrito.createCarrito()
    /* console.log(`Carrito creado con el id ${carrito.id}`) */
    res.json(`Post llevado a a cabo`)
})

router.delete("/:id", authie, (req, res) => {
    const id = req.params.id
    carrito.deleteById(id)
    res.json("Carrito eliminado")
})

router.get("/:id/productos", authie, async (req, res) => {
    const id = req.params.id
    const carritoProducto = await carrito.getById(id)
    res.json(carritoProducto.productos)
})

router.post("/:id/productos", authie, async (req, res) => {
    const producto = req.body
    const id = req.params.id
    await carrito.addProduct(id, producto)
    res.json(`Post llevado a a cabo`)
})

router.delete("/:id/productos/:id_prod", authie, (req, res) => {
    const id = req.params.id
    const id_prod = req.params.id_prod
    carrito.deleteProdudct(id, id_prod)
    res.json(`Producto eliminado del carrito`)
})

module.exports = router